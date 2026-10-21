import type { ContactField } from "./fields";

export type ContactValues = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: ContactValues;
    };

export const initialContactState: ContactState = { status: "idle" };

export const honeypotField = "siteWeb";

export const startedAtField = "startedAt";
