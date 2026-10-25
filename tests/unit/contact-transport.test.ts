import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { EmailMessage } from "@/lib/contact/send";
import { contactTransportFromEnv } from "@/lib/contact/transport";

const { createTransport, sendMail } = vi.hoisted(() => {
  const sendMail = vi.fn(async () => ({}));
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});

vi.mock("nodemailer", () => ({ createTransport }));

const message: EmailMessage = {
  from: "\"Apport Fiscalité\" <formulaire@example.com>",
  to: "info@example.com",
  replyTo: "marie@example.com",
  subject: "Message du site web – Marie Tremblay",
  text: "Bonjour",
};

function stubConfiguredEnv() {
  vi.stubEnv("SMTP_USER", "formulaire@example.com");
  vi.stubEnv("SMTP_TOKEN", "secret-token");
  vi.stubEnv("CONTACT_TO_EMAIL", "info@example.com");
}

beforeEach(() => {
  createTransport.mockClear();
  sendMail.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("contactTransportFromEnv", () => {
  it("connects to Proton over STARTTLS with the SMTP token", () => {
    stubConfiguredEnv();
    contactTransportFromEnv();
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.protonmail.ch",
        port: 587,
        requireTLS: true,
        auth: { user: "formulaire@example.com", pass: "secret-token" },
      }),
    );
  });

  it("sends from the token's address under the firm's name, to the configured inbox", () => {
    stubConfiguredEnv();
    expect(contactTransportFromEnv().addresses).toEqual({
      from: "\"Apport Fiscalité\" <formulaire@example.com>",
      to: "info@example.com",
    });
  });

  it("hands the message to nodemailer unchanged", async () => {
    stubConfiguredEnv();
    await contactTransportFromEnv().transport(message);
    expect(sendMail).toHaveBeenCalledWith(message);
  });

  it("lets a sending failure reach the caller", async () => {
    stubConfiguredEnv();
    sendMail.mockRejectedValueOnce(new Error("Invalid login: 535"));
    await expect(contactTransportFromEnv().transport(message)).rejects.toThrow("Invalid login");
  });

  it.each(["SMTP_USER", "SMTP_TOKEN", "CONTACT_TO_EMAIL"])(
    "refuses to send in production when %s is missing",
    async (name) => {
      stubConfiguredEnv();
      vi.stubEnv(name, "");
      vi.stubEnv("NODE_ENV", "production");
      const { transport } = contactTransportFromEnv();
      await expect(transport(message)).rejects.toThrow("is not set");
      expect(createTransport).not.toHaveBeenCalled();
    },
  );

  it("logs instead of sending in development when unconfigured", async () => {
    vi.stubEnv("SMTP_TOKEN", "");
    vi.stubEnv("NODE_ENV", "development");
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    await contactTransportFromEnv().transport(message);
    expect(info).toHaveBeenCalledOnce();
    expect(createTransport).not.toHaveBeenCalled();
  });
});
