import { Router } from "express";
import { loginByOauth0 } from "../../function/user/login-by-oauth";

const router = Router();

router.get("/", async (request, response) => {
  const { code } = request.query;

  if (!code)
    return response
      .status(400)
      .send({ error: true, message: "Missing code from auth0" });

  const result = await loginByOauth0(code as string);

  if (typeof result === "object")
    return response
      .status(result.status)
      .send({ message: result.message, error: result.error });

  return response.status(201).send(result);
});

export const oauthGithubRoute = router;
