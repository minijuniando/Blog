import jwt from "jsonwebtoken";
import { env } from "../src/common/env";

export async function validateUser(request: Request, response: Response) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).send("Missing auth token");

  jwt.verify(token, env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return response.status(403).send(err);
    request.user = user;
    next();
  });
}
