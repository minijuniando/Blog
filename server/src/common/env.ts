import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  MONGO_DB_URI: url(),
})
