import { Router } from "express";
import { createArticle } from "../../function/article/create-article";
const router = Router();

//router.get("/")

router.post("/", async (request, response) => {
  //const { userId, photoUrl, title, content } = request.body;
  //TODO: ALGUM COMPORTAMENTO CASO NÃO TENHA UMA FOTO

  const result = await createArticle(request.body);
  if (!result) return response.status(400).send("Error");
  return response.status(201).send(result);
});

export const articleRoutes = router;

