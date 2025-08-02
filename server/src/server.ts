import chalk from "chalk";
import cors from "cors";
import express from "express";
import { swaggerDocs } from "./common/docs";
import { env } from "./common/env";
import { articleRoutes } from "./routes/article";
import { likeRoutes } from "./routes/like";
import { oauthGithubRoute } from "./routes/oauth/github";
import { userRoutes } from "./routes/user";
import { loginRoute } from "./routes/user/login";
import { signupRoute } from "./routes/user/signup";
import { viewRoute } from "./routes/views";

export const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/oauth", oauthGithubRoute);
app.use("/article", articleRoutes);
app.use("/like", likeRoutes);
app.use("/view", viewRoute);
app.use("/users", userRoutes);

app.get("/health", (_, response) => {
  return response.status(200).send("OK");
});

app.listen(env.PORT, (err: Error | undefined): void => {
  if (err) {
    console.log(err);
    throw err;
  }
  swaggerDocs(app);
  console.log(chalk.blueBright(`HTTP Server Running on ${env.PORT}`));
});
