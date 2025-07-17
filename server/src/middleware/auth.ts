import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import { env } from "../common/env";
import type { Request, Response } from "express";

export async function validateUser(
  request: Request,
  response: Response,
  next: () => unknown,
) {
  const { authorization: authHeader } = request.headers;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).send();

  jwt.verify(
    token,
    env.TOKEN_SECRET,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      console.log(err);
      if (err || !user) return response.status(403).send(err);
      (request as any).user = user;
      next();
    },
  );
}
