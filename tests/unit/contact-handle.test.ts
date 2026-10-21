import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { handleContactSubmission, minimumFillTimeMs } from "@/lib/contact/handle";
import type { EmailTransport } from "@/lib/contact/send";
import { honeypotField, startedAtField } from "@/lib/contact/state";

const { messages } = site.contact;

const now = 1_800_000_000_000;

const addresses = { from: "site@mail.example.com", to: "info@example.com" };

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

function submit(fields: Record<string, string>, transport: EmailTransport = vi.fn(async () => {})) {
  return handleContactSubmission(formData(fields), { transport, addresses, now });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("handleContactSubmission", () => {
  it("sends a valid submission and reports success", async () => {
    const transport = vi.fn(async () => {});
    const state = await submit({ ...validFields, [startedAtField]: String(now - 10_000) }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledOnce();
  });

  it("accepts a submission without a start time, as sent without JavaScript", async () => {
    const transport = vi.fn(async () => {});
    expect(await submit(validFields, transport)).toEqual({ status: "success" });
    expect(transport).toHaveBeenCalledOnce();
  });

  it("pretends to succeed and sends nothing when the honeypot is filled", async () => {
    const transport = vi.fn(async () => {});
    const state = await submit({ ...validFields, [honeypotField]: "https://spam.example" }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).not.toHaveBeenCalled();
  });

  it("pretends to succeed and sends nothing when the form was filled too fast", async () => {
    const transport = vi.fn(async () => {});
    const state = await submit({ ...validFields, [startedAtField]: String(now - minimumFillTimeMs + 1) }, transport);
    expect(state).toEqual({ status: "success" });
    expect(transport).not.toHaveBeenCalled();
  });

  it("returns field errors and the submitted values when validation fails", async () => {
    const transport = vi.fn(async () => {});
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

  it("returns a generic message, without provider details, when sending fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const transport = vi.fn(async () => {
      throw new Error("provider secret detail");
    });
    const state = await submit(validFields, transport);
    expect(state).toEqual({ status: "error", message: messages.failure, values: validFields });
    expect(JSON.stringify(state)).not.toContain("provider secret detail");
  });
});
