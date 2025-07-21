import chalk from "chalk";
import { Router } from "express";
import z from "zod";
import { db } from "../../db/client";
import { sendCodeToUser } from "../../function/user/send-code-to-user";
import { createUser } from "../../function/user/create-user";

const router = Router();

router.post("/", async (request, response): Promise<unknown> => {
  try {
    const { email } = request.body;

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "Este usuário já existe",
      });
    }

    const { user, jwt } = await sendCodeToUser(request.body);

    return response.status(201).send({ user, jwt });
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

router.post("/:code", async (request, response) => {
  const { code } = request.params;
  const { email } = request.body;

  if (!email) return response.status(400).send("Missing email on request body");
  if (!code) return response.status(400).send("Missing code on request body");

  const result = await createUser(email, code);
});

export const signupRoute = router;
