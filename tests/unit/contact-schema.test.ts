import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { contactSchema } from "@/lib/contact/schema";

const { messages } = site.contact;

const valid = {
  firstName: "Marie",
  lastName: "Tremblay",
  email: "marie@example.com",
  message: "Bonjour",
};

function errorsFor(input: Record<string, string>) {
  const result = contactSchema.safeParse(input);
  if (result.success) return {};
  return Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]));
}

describe("contactSchema", () => {
  it("accepts a complete submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims every field", () => {
    const result = contactSchema.parse({
      firstName: "  Marie ",
      lastName: "\tTremblay\n",
      email: " marie@example.com ",
      message: "  Bonjour  ",
    });
    expect(result).toEqual(valid);
  });

  it("allows an empty message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "" }).success).toBe(true);
  });

  it("requires the names and the email", () => {
    expect(errorsFor({ ...valid, firstName: "   ", lastName: "", email: "" })).toEqual({
      firstName: messages.required,
      lastName: messages.required,
      email: messages.required,
    });
  });

  it("rejects an invalid email", () => {
    expect(errorsFor({ ...valid, email: "marie@" })).toEqual({ email: messages.invalidEmail });
  });

  it("enforces the length limits", () => {
    expect(contactSchema.safeParse({ ...valid, firstName: "a".repeat(100) }).success).toBe(true);
    expect(
      errorsFor({
        ...valid,
        firstName: "a".repeat(101),
        lastName: "b".repeat(101),
        email: `${"c".repeat(250)}@example.com`,
        message: "d".repeat(5001),
      }),
    ).toEqual({
      firstName: messages.tooLong,
      lastName: messages.tooLong,
      email: messages.tooLong,
      message: messages.tooLong,
    });
  });
});
