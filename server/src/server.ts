import express from "express";

export const app = express();

app.get("/health", (request, response) => {
  return response.status(200).send("OK");
})
