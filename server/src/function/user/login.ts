import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { ErrorSchema } from "../../types";

export async function login({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{ token: string } | ErrorSchema> {
	const user = await db.user.findFirst({
		where: { email },
	});
	if (!user) return response.status(400).send("Este usuário não existe");

	const hashedPassword = user.password;
	const comparedPassword = await bcrypt.compare(password, hashedPassword);

	if (!comparedPassword) return response.status(400).send("Senha inválida");

	const token = jwt.sign({ id: user.id, email: user.email }, env.TOKEN_SECRET);

	return response.json({ token });
}
