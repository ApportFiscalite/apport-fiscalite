import { describe, expect, it, vi } from "vitest";
import { buildContactEmail, sendContactEmail } from "@/lib/contact/send";

const addresses = { from: "site@mail.example.com", to: "info@example.com" };

const input = {
  firstName: "Marie",
  lastName: "Tremblay",
  email: "marie@example.com",
  message: "Bonjour,\nj’aimerais un rendez-vous.",
};

describe("buildContactEmail", () => {
  it("sends from the fixed sender to the firm, replying to the visitor", () => {
    const email = buildContactEmail(input, addresses);
    expect(email.from).toBe(addresses.from);
    expect(email.to).toBe(addresses.to);
    expect(email.replyTo).toBe(input.email);
    expect(email.subject).toBe("Message du site web – Marie Tremblay");
  });

  it("writes a plain-text body with every field", () => {
    expect(buildContactEmail(input, addresses).text).toBe(
      [
        "Prénom : Marie",
        "Nom de famille : Tremblay",
        "Courriel : marie@example.com",
        "",
        "Votre message :",
        "Bonjour,\nj’aimerais un rendez-vous.",
      ].join("\n"),
    );
  });

  it("notes when the message is empty", () => {
    expect(buildContactEmail({ ...input, message: "" }, addresses).text.endsWith("(aucun message)")).toBe(true);
  });

  it("strips control characters from the subject", () => {
    const email = buildContactEmail({ ...input, firstName: "Marie\r\nBcc: x@y.z", lastName: "T\u0000" }, addresses);
    expect(email.subject).toBe("Message du site web – Marie Bcc: x@y.z T");
    expect(email.subject).not.toMatch(/[\r\n\u0000]/);
  });
});

describe("sendContactEmail", () => {
  it("hands the built email to the transport", async () => {
    const transport = vi.fn(async () => {});
    await sendContactEmail(input, transport, addresses);
    expect(transport).toHaveBeenCalledWith(buildContactEmail(input, addresses));
  });
});
