export type SendEmailParams = {
  userEmail: string;
  subject: string;
  html?: string;
  text?: string;
};

export type NewAccountTemporaryData = {
  username: string;
  email: string;
  password: string;
  code: string;
  role: string;
  generatedAt: number;
};

export const roles = {
  READER: "READER",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
} as const;
