import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { ErrorSchema } from "../../types";
import { db } from "../../db/client";

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
	const comparedPassword = await bcrypt.compare(password, hashedPassword);

	if (!comparedPassword) return response.status(400).send("Senha inválida");

	const token = jwt.sign({ id: user.id, email: user.email }, env.TOKEN_SECRET);

	return response.json({ token });
}
