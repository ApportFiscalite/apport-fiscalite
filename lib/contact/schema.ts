import { z } from "zod";
import { site } from "@/content/site";
import { contactLimits } from "./fields";

const { messages } = site.contact;

const requiredText = (max: number) =>
  z.string().trim().min(1, { error: messages.required }).max(max, { error: messages.tooLong });

export const contactSchema = z.object({
  firstName: requiredText(contactLimits.firstName),
  lastName: requiredText(contactLimits.lastName),
  email: requiredText(contactLimits.email).pipe(z.email({ error: messages.invalidEmail })),
  message: z.string().trim().max(contactLimits.message, { error: messages.tooLong }),
});

export type ContactInput = z.infer<typeof contactSchema>;
