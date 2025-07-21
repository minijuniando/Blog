import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";
import { validateSignup } from "../../schema/user";
import type { NewAccountTemporaryData } from "../../types/user";
import { verifyEmailHtml } from "../../utils/html/verify-email";
import { handleSendEmail } from "../../utils/send-email";

export const codes: Record<string, NewAccountTemporaryData> = {};
const ONE_SECOND_IN_MS = 1000;
const FIVE_MINUTES_IN_MS = 1000 * 300;

setInterval((): void => {
  for (const code in codes) {
    if (Date.now() - FIVE_MINUTES_IN_MS > codes[code].generatedAt) {
      delete codes[code];
    }
  }
}, ONE_SECOND_IN_MS);

export const sendCodeToUser = async (body: NewAccountTemporaryData) => {
  try {
    const { username, email, password, role } = await validateSignup(body);

    const hashedPassword = await bcrypt.hash(password, 8);
    const generatedCode = Math.random().toString().slice(2, 6);

    await Promise.all([
      await handleSendEmail({
        userEmail: email,
        subject: "Verificação de Email - Blog Mini-Juniando",
        html: verifyEmailHtml(username, generatedCode),
      }),

      (codes[email] = {
        username,
        code: generatedCode,
        email,
        password: hashedPassword,
        role,
        generatedAt: Date.now(),
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
