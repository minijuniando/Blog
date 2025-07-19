import bcrypt from "bcrypt";
import chalk from "chalk";
import { Router } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { env } from "../../common/env";
import { db } from "../../db/client";
import { validateSignup } from "../../schema/user";
import { verifyEmailHtml } from "../../utils/html/verify-email";
import { handleSendEmail } from "../../utils/send-email";

const router = Router();

router.post("/", async (request, response): Promise<unknown> => {
  try {
    console.log(request.body);
    const { username, email, password, role } = await validateSignup(
      request.body,
    );

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "Este usuário já existe",
      });
    }

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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      env.TOKEN_SECRET,
    );

    await handleSendEmail({
      userEmail: user.email,
      subject: "Verificação de Email - Blog Mini-Juniando",
      html: verifyEmailHtml(user.username),
    });

    return response.status(201).send({ user, jwt: token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        success: false,
        message: error.issues[0].message,
      });
    }
    console.error(chalk.red(error));

    response.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});

export const signupRoute = router;
