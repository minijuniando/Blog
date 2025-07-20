import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num(),
  MONGODB_URI: str({
    example: "mongodb://<username>:<password>@localhost:<port>/minijuniando",
  }),
  TOKEN_SECRET: str(),
  MY_GMAIL: str({ example: "mygmail@gmail.com" }),
  MY_GMAIL_PASSWORD: str({
    example:
      "tem que ir nas config do google, criar uma senha de app e colar no .env, pesquisa no youtube q é fácil",
  }),
});
