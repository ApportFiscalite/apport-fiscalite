import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { handleContactSubmission, minimumFillTimeMs } from "@/lib/contact/handle";
import { buildConfirmationEmail, type EmailMessage, type EmailTransport } from "@/lib/contact/send";
import { honeypotField, startedAtField } from "@/lib/contact/state";

const { messages } = site.contact;

const now = 1_800_000_000_000;

const addresses = { from: "\"Apport Fiscalité\" <formulaire@example.com>", to: "info@example.com" };

const validFields = {
  firstName: "Marie",
  lastName: "Tremblay",
  email: "marie@example.com",
  message: "Bonjour",
};

function formData(fields: Record<string, string>) {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
}

function createTransport() {
  return vi.fn<(message: EmailMessage) => Promise<void>>(async () => {});
}

async function submit(fields: Record<string, string>, transport: EmailTransport = createTransport()) {
  const deferred: Promise<void>[] = [];
  const defer = (task: () => Promise<void>) => {
    deferred.push(task());
  };
  const state = await handleContactSubmission(formData(fields), { transport, addresses, now, defer });
  await Promise.all(deferred);
  return state;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("handleContactSubmission", () => {
  it("sends the firm's email, then the visitor's confirmation, and reports success", async () => {
    const transport = createTransport();
    const state = await submit({ ...validFields, [startedAtField]: String(now - 10_000) }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledTimes(2);
    expect(transport.mock.calls[0][0].to).toBe(addresses.to);
    expect(transport.mock.calls[1][0]).toEqual(buildConfirmationEmail(validFields.email, addresses));
  });

  it("reports success before the confirmation is sent", async () => {
    const transport = createTransport();
    const tasks: (() => Promise<void>)[] = [];
    const state = await handleContactSubmission(formData(validFields), {
      transport,
      addresses,
      now,
      defer: (task) => {
        tasks.push(task);
      },
    });
    expect(state).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledOnce();
    expect(tasks).toHaveLength(1);
    await tasks[0]();
    expect(transport).toHaveBeenCalledTimes(2);
  });

  it("accepts a submission without a start time, as sent without JavaScript", async () => {
    const transport = createTransport();
    expect(await submit(validFields, transport)).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledTimes(2);
  });

  it("pretends to succeed and sends nothing when the honeypot is filled", async () => {
    const transport = createTransport();
    const state = await submit({ ...validFields, [honeypotField]: "https://spam.example" }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).not.toHaveBeenCalled();
  });

  it("pretends to succeed and sends nothing when the form was filled too fast", async () => {
    const transport = createTransport();
    const state = await submit({ ...validFields, [startedAtField]: String(now - minimumFillTimeMs + 1) }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).not.toHaveBeenCalled();
  });

  it("returns field errors and the submitted values when validation fails", async () => {
    const transport = createTransport();
    const state = await submit({ ...validFields, firstName: "", email: "pas-un-courriel" }, transport);
    expect(state).toEqual({
      status: "error",
      message: messages.summary,
      fieldErrors: { firstName: messages.required, email: messages.invalidEmail },
      values: { ...validFields, firstName: "", email: "pas-un-courriel" },
    });
    expect(transport).not.toHaveBeenCalled();
  });

  it("treats missing fields as empty", async () => {
    const state = await submit({});
    expect(state).toMatchObject({
      status: "error",
      fieldErrors: { firstName: messages.required, lastName: messages.required, email: messages.required },
      values: { firstName: "", lastName: "", email: "", message: "" },
    });
  });

  it("returns a generic message and skips the confirmation when the firm's email fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const transport = vi.fn(async () => {
      throw new Error("provider secret detail");
    });
    const state = await submit(validFields, transport);
    expect(state).toEqual({ status: "error", message: messages.failure, values: validFields });
    expect(JSON.stringify(state)).not.toContain("provider secret detail");
    expect(transport).toHaveBeenCalledOnce();
  });

  it("still reports success and logs it when only the confirmation fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const transport = createTransport();
    transport.mockResolvedValueOnce().mockRejectedValueOnce(new Error("Invalid login: 535"));
    const state = await submit(validFields, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledTimes(2);
    expect(error).toHaveBeenCalledWith("Contact confirmation could not be sent", expect.any(Error));
  });
});
