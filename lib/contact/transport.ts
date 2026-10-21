import { Resend } from "resend";
import type { ContactAddresses, EmailTransport } from "./send";

function createResendTransport(apiKey: string): EmailTransport {
  const resend = new Resend(apiKey);
  return async (message) => {
    const { error } = await resend.emails.send(message);
    if (error) throw new Error(`Resend rejected the email: ${error.name}`);
  };
}

const logTransport: EmailTransport = async (message) => {
  console.info("Contact email (development, not sent)", message);
};

const missingConfigurationTransport: EmailTransport = async () => {
  throw new Error("RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set");
};

export function contactTransportFromEnv(): { transport: EmailTransport; addresses: ContactAddresses } {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (apiKey && to && from) {
    return { transport: createResendTransport(apiKey), addresses: { from, to } };
  }

  const placeholder = { from: from ?? "site@localhost", to: to ?? "info@localhost" };
  if (process.env.NODE_ENV === "development") {
    return { transport: logTransport, addresses: placeholder };
  }
  return { transport: missingConfigurationTransport, addresses: placeholder };
}
