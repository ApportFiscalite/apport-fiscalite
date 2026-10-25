import { site } from "@/content/site";
import type { ContactInput } from "./schema";

export type EmailMessage = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type EmailTransport = (message: EmailMessage) => Promise<void>;

export type ContactAddresses = { from: string; to: string };

const subjectPrefix = "Message du site web – ";

const controlCharacters = /[\u0000-\u001f\u007f-\u009f]/g;

function singleLine(value: string) {
  return value.replace(controlCharacters, " ").replace(/\s+/g, " ").trim();
}

export function buildContactEmail(input: ContactInput, addresses: ContactAddresses): EmailMessage {
  const { fields } = site.contact;
  const name = singleLine(`${input.firstName} ${input.lastName}`);
  const text = [
    `${fields.firstName.label} : ${input.firstName}`,
    `${fields.lastName.label} : ${input.lastName}`,
    `${fields.email.label} : ${input.email}`,
    "",
    `${fields.message.label} :`,
    input.message || "(aucun message)",
  ].join("\n");

  return {
    from: addresses.from,
    to: addresses.to,
    replyTo: input.email,
    subject: `${subjectPrefix}${name}`,
    text,
  };
}

export function buildConfirmationEmail(visitorEmail: string, addresses: ContactAddresses): EmailMessage {
  const { subject, paragraphs } = site.contact.confirmation;
  return {
    from: addresses.from,
    to: visitorEmail,
    replyTo: addresses.to,
    subject,
    text: paragraphs.join("\n\n"),
  };
}

export async function sendConfirmationEmail(
  visitorEmail: string,
  transport: EmailTransport,
  addresses: ContactAddresses,
) {
  await transport(buildConfirmationEmail(visitorEmail, addresses));
}

export async function sendContactEmail(
  input: ContactInput,
  transport: EmailTransport,
  addresses: ContactAddresses,
) {
  await transport(buildContactEmail(input, addresses));
}
