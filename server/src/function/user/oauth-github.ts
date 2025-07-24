import { env } from "../../common/env";
import type { ErrorSchema, GithubUserData } from "../../types";
import type { UserSchema } from "../../types/user";

export async function oauthGithub(code: string): Promise<void | ErrorSchema> {
  try {
    const accessTokenRoute = await fetch("", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const { access_token: accessToken } = await accessTokenRoute.json();

    if (!accessToken) {
      console.log(accessTokenRoute);
      return {
        error: true,
        status: 500,
        message: "Falha ao receber o access token",
      };
    }

    const userRoute = await fetch("", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUserData = await userRoute.json();

    if (!githubUserData) {
      console.log(accessTokenRoute);
      return {
        error: true,
        status: 500,
        message: "Falha ao receber os dados do github do usuário",
      };
    }

    const {
      id: githubId,
      avatar_url,
      email,
      name,
    }: GithubUserData = githubUserData;

    if (!email)
      return {
        error: true,
        status: 400,
        message:
          "O email do usuário não está público no Github, preciso dele pra autenticar",
      };

    console.log(githubId);
  } catch (error) {
    console.log(error);
    return { error: true, status: 500, message: error as string };
  }
}
