import { Router } from "express";
import { createLike } from "../../function/like/create-like";

const router = Router();

router.post("/likes", async (request, response) => {
  const { userId, articleId } = request.body;
  const result = await createLike({ articleId, userId });

  if ("error" in result) {
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });
  }

  return response.status(201).send({ like: result });
});
