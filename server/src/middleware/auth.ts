import type { Request, Response } from "express";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { env } from "../common/env";

export async function validateUser(
  request: Request,
  response: Response,
  next: () => unknown,
) {
  const { authorization: authHeader } = request.headers;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).send("Missing auth token");

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
