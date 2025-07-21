import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../../db/client";

const router = Router();

router.post("/login", async (request, response) => {
	const { email, password } = request.body;

	const user = await db.user.findFirst({
		where: { email },
	});
	if (!user) return response.status(400).send("Este usuário não existe");

	const hashedPassword = user.password;

	const comparedPassword = bcrypt.compare(user.password, password);
	const salve = "salve";
});

export const loginRoute = router;
