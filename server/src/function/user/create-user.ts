import type { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";
import { codes } from "./send-code-to-user";

export const createUser = async (email: string, code: string) => {
  try {
    const userData = codes[email];
    if (!userData || userData.code !== code) return null;

    const user = await db.user.create({
      data: {
        username: userData.username,
        email: email.toLowerCase(),
        password: userData.password,
        role: userData.role as UserRole,
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.TOKEN_SECRET,
    );
    return { user, token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
