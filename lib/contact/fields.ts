export const contactFields = ["firstName", "lastName", "email", "message"] as const;

export type ContactField = (typeof contactFields)[number];

export const contactLimits = {
  firstName: 100,
  lastName: 100,
  email: 254,
  message: 5000,
} as const satisfies Record<ContactField, number>;
