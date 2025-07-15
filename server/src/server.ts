import express from "express";

export const app = express();

app.use(express.json());

app.get("/health", (request, response) => {
  return response.status(200).send("OK");
})

app.listen(3333, (err: Error | undefined): void => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("HTTP Server Running!");
})
