export type SendEmailParams = {
  userEmail: string;
  subject: string;
  html?: string;
  text?: string;
};

export const roles = {
  READER: "READER",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
} as const;
