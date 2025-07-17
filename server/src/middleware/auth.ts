import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { env } from "../common/env";
import { type Request, type Response } from "express";

export async function validateUser(
  request: Request,
  response: Response,
  next: () => unknown,
) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).send();

  jwt.verify(
    token,
    env.TOKEN_SECRET,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      console.log(err);
      if (err || !user) return response.status(403).send(err);
      request.user = user;
      next();
    },
  );
}
