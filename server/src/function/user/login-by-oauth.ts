import jwt from "jsonwebtoken";
import { env } from "../../common/env";
import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

interface Auth0UserData {
  sub: string;
  name: string;
  nickname: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export async function loginByOauth0(
  code: string,
): Promise<string | ErrorSchema> {
  try {
    const tokenResponse = await fetch(
      `https://${env.OAUTH0_DOMAIN}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: env.OAUTH0_CLIENT_ID,
          client_secret: env.OAUTH0_CLIENT_SECRET,
          code,
          redirect_uri: "http://localhost:3000/oauth",
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    const { access_token: accessToken } = tokenData;

    if (!accessToken) {
      console.error("Auth0 Token Error:", tokenData);
      return {
        error: true,
        status: 500,
        message: "Falha ao obter o access token da Auth0.",
      };
    }

    const userResponse = await fetch(`https://${env.OAUTH0_DOMAIN}/userinfo`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    if (!userData) {
      console.error("Auth0 UserInfo Error:", await userResponse.text());
      return {
        error: true,
        status: 500,
        message: "Falha ao obter os dados do usuário da Auth0.",
      };
    }

    const {
      sub: auth0Id,
      email,
      nickname: username,
      picture: photoUrl,
    }: Auth0UserData = userData;

    if (!email) {
      return {
        error: true,
        status: 400,
        message:
          "O email do usuário não foi retornado pela Auth0. É necessário para a autenticação.",
      };
    }

    const upsertUser = await db.user.upsert({
      where: {
        email,
      },
      update: {
        authOId: auth0Id,
      },
      create: {
        authOId: auth0Id,
        role: "READER",
        username,
        email,
        photoUrl,
      },
    });

    const token = jwt.sign(
      { id: upsertUser.id, email: upsertUser.email },
      env.TOKEN_SECRET,
    );
    return token;
  } catch (error) {
    console.error("Erro no fluxo OAuth da Auth0:", error);
    return { error: true, status: 500, message: (error as Error).message };
  }
}
