import type { z } from "zod";
import { site } from "@/content/site";
import { contactFields, type ContactField } from "./fields";
import { contactSchema } from "./schema";
import { sendContactEmail, type ContactAddresses, type EmailTransport } from "./send";
import { honeypotField, startedAtField, type ContactState, type ContactValues } from "./state";

export const minimumFillTimeMs = 1500;

export type ContactDependencies = {
  transport: EmailTransport;
  addresses: ContactAddresses;
  now: number;
};

function readText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function looksAutomated(formData: FormData, now: number) {
  if (readText(formData, honeypotField).trim() !== "") return true;
  const startedAt = Number(readText(formData, startedAtField));
  if (!Number.isFinite(startedAt) || startedAt <= 0) return false;
  return now - startedAt < minimumFillTimeMs;
}

function firstErrorPerField(error: z.ZodError) {
  const fieldErrors: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField;
    fieldErrors[field] ??= issue.message;
  }
  return fieldErrors;
}

export async function handleContactSubmission(
  formData: FormData,
  { transport, addresses, now }: ContactDependencies,
): Promise<ContactState> {
  const { messages } = site.contact;

  if (looksAutomated(formData, now)) return { status: "success" };

  const values = Object.fromEntries(
    contactFields.map((field) => [field, readText(formData, field)]),
  ) as Required<ContactValues>;

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: messages.summary,
      fieldErrors: firstErrorPerField(parsed.error),
      values,
    };
  }

  try {
    await sendContactEmail(parsed.data, transport, addresses);
    return { status: "success" };
  } catch (error) {
    console.error("Contact email could not be sent", error);
    return { status: "error", message: messages.failure, values };
  }
}
