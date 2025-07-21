import chalk from "chalk";
import { Router } from "express";
import z from "zod";
import { db } from "../../db/client";
import { } from "../../function/user/send-code-to-user";

const router = Router();

router.post("/", async (request, response): Promise<unknown> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "Este usuário já existe",
      });
    }

    const { user } = await sendCodeToUser(request.body);

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
