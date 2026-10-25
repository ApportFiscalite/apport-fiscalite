import { createTransport } from "nodemailer";
import { site } from "@/content/site";
import type { ContactAddresses, EmailTransport } from "./send";

const protonSmtp = {
  host: "smtp.protonmail.ch",
  port: 587,
  requireTLS: true,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
};

function createProtonTransport(user: string, token: string): EmailTransport {
  const smtp = createTransport({ ...protonSmtp, auth: { user, pass: token } });
  return async (message) => {
    await smtp.sendMail(message);
  };
}

const logTransport: EmailTransport = async (message) => {
  console.info("Contact email (development, not sent)", message);
};

const missingConfigurationTransport: EmailTransport = async () => {
  throw new Error("SMTP_USER, SMTP_TOKEN or CONTACT_TO_EMAIL is not set");
};

export function contactTransportFromEnv(): { transport: EmailTransport; addresses: ContactAddresses } {
  const user = process.env.SMTP_USER;
  const token = process.env.SMTP_TOKEN;
  const to = process.env.CONTACT_TO_EMAIL;

  if (user && token && to) {
    return { transport: createProtonTransport(user, token), addresses: { from: `"${site.name}" <${user}>`, to } };
  }

  const placeholder = { from: user ?? "site@localhost", to: to ?? "info@localhost" };
  if (process.env.NODE_ENV === "development") {
    return { transport: logTransport, addresses: placeholder };
  }
  return { transport: missingConfigurationTransport, addresses: placeholder };
}
