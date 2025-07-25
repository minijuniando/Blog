import { Router } from "express";
import { login } from "../../function/user/login";

const router = Router();

router.post("/", async (request, response) => {
	const { email, password } = request.body;
	const result = await login({ email, password });
	if ("error" in result)
		return response
			.status(result.status)
			.send({ error: true, message: result.message });
});

export const loginRoute = router;
