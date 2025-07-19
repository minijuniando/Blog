import express from "express";
import { env } from "./common/env";
import { signupRoute } from "./routes/user/signup";

export const app = express();

app.use(express.json());
app.use("/signup", signupRoute);

app.get("/health", (_, response) => {
  return response.status(200).send("OK");
});

app.listen(3333, (err: Error | undefined): void => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`HTTP Server Running on ${env.PORT}`);
});
