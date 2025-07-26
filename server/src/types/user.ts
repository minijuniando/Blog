import type { $Enums } from "@prisma/client";

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

export type UserSchema = {
  id: string;
  username: string;
  email: string;
  password: string | null;
  photoUrl: string | null;
  role: $Enums.UserRole;
  createdAt: Date;
};
