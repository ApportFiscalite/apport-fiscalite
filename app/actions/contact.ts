"use server";

import { handleContactSubmission } from "@/lib/contact/handle";
import type { ContactState } from "@/lib/contact/state";
import { contactTransportFromEnv } from "@/lib/contact/transport";

export async function sendContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  return handleContactSubmission(formData, { ...contactTransportFromEnv(), now: Date.now() });
}
