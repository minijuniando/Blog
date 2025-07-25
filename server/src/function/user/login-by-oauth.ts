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
          redirect_uri: "http://localhost:3000/callback",
        }),
      },
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Auth0 Token Error:", tokenData);
      return {
        error: true,
        status: 500,
        message: "Falha ao obter o access token da Auth0.",
      };
    }

    const { access_token: accessToken } = tokenData;

    // Etapa 2: Usar o Access Token para buscar informações do perfil do usuário
    const userResponse = await fetch(`https://${env.OAUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData: Auth0UserData = await userResponse.json();

    if (!userData) {
      console.error("Auth0 UserInfo Error:", await userResponse.text());
      return {
        error: true,
        status: 500,
        message: "Falha ao obter os dados do usuário da Auth0.",
      };
    }

    const { name, email, picture, sub: auth0Id } = userData;

    if (!email) {
      return {
        error: true,
        status: 400,
        message:
          "O email do usuário não foi retornado pela Auth0. É necessário para a autenticação.",
      };
    }

    console.log("Dados do usuário recebidos da Auth0:", {
      auth0Id,
      name,
      email,
      picture,
    });

    const upsertUser = await db.user.upsert({
      where: {
        email,
      },
      update: {
        oauthOId: auth0Id,
      },
      create: {
        oauthOId: auth0Id,
        role: "READER",
        username: name,
        email,
        photoUrl: picture,
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
