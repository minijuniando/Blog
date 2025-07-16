import express from "express";
import { env } from "./common/env";
import "./db/client.ts";

export const app = express();

app.use(express.json());
// app.use();

app.get("/health", (_, response) => {
  return response.status(200).send("OK");
})

app.listen(Number(env.PORT), (err: Error | undefined): void => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`HTTP Server Running on ${env.PORT}`);
});
