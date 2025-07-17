import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  MONGODB_URI: url({
    example: "mongodb://<username>:<password>@localhost:<port>/mydb",
  }),
  TOKEN_SECRET: str(),
});
