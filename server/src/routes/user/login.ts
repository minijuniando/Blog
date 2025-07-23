import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";

const router = Router();

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  const user = await db.user.findFirst({
    where: { email },
  });
  if (!user) return response.status(400).send("Este usuário não existe");

  const hashedPassword = user.password;
  console.log(`[DEBUG] Hash from DB for ${email}: ${hashedPassword}`);
  const comparedPassword = await bcrypt.compare(password, hashedPassword);
  console.log(`[DEBUG] Password comparison result for ${email}: ${comparedPassword}`);

  if (!comparedPassword) return response.status(400).send("Senha inválida");

  const token = jwt.sign({ id: user.id, email: user.email }, env.TOKEN_SECRET);

  return response.json({ token });
});

export const loginRoute = router;
