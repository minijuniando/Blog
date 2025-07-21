export type SendEmailParams = {
  userEmail: string;
  subject: string;
  html?: string;
  text?: string;
};

export type UserDetails = {
  username: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
};

export const roles = {
  READER: "READER",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
} as const;
