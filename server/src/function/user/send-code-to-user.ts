import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";
import { validateSignup } from "../../schema/user";
import type { UserDetails } from "../../types/user";
import { verifyEmailHtml } from "../../utils/html/verify-email";
import { handleSendEmail } from "../../utils/send-email";

export const codes: Record<string, UserDetails> = {};

export const sendCodeToUser = async (body: UserDetails): Promise<unknown> => {
  const { username, email, password, role } = await validateSignup(body);

  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await db.user.create({
    data: {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      photoUrl: true,
      createdAt: true,
    },
  });

  const token = jwt.sign({ id: user.id, email: user.email }, env.TOKEN_SECRET);

  await handleSendEmail({
    userEmail: user.email,
    subject: "Verificação de Email - Blog Mini-Juniando",
    html: verifyEmailHtml(user.username),
  });

  return { user, jwt: token };
};
