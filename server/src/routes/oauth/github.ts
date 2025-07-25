import { Router } from "express";
import { loginByOauth0 } from "../../function/user/login-by-oauth";

const router = Router();

router.get("/", async (request, response) => {
	const { code } = request.query;
	if (!code)
		return response
			.status(400)
			.send({ error: true, message: "Missing github callback code" });
	const result = await loginByOauth0(code as string);

	if (typeof result === "object")
		return response
			.status(result.status)
			.send({ error: result.error, message: result.message });

	return response.status(200).send({ accessToken: result });
});

export const oauthGithubRoute = router;
