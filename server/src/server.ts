import express from "express";
import { env } from "./common/env";
import { articleRoutes } from "./routes/article";
import { loginRoute } from "./routes/user/login";
import { signupRoute } from "./routes/user/signup";

export const app = express();

//WARN: coloquem todas as rotas embaixo disso aqui, senão não reconhece o body da requisição
app.use(express.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/articles", articleRoutes);

app.get("/health", (_, response) => {
  return response.status(200).send("OK");
});

app.listen(env.PORT, (err: Error | undefined): void => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`HTTP Server Running on ${env.PORT}`);
});
