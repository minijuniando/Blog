import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string } | ErrorSchema> {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user)
    return { error: true, status: 400, message: "Esse usuário já existe" };

  const hashedPassword = user.password;
  if (hashedPassword) {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    if (!comparedPassword)
      return { error: true, status: 400, message: "Senha inválida" };
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.TOKEN_SECRET);

  return { token };
}
