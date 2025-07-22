import { Router } from "express";
import { db } from "../../db/client";
import { createArticle } from "../../function/article/create-article";
import { deleteArticle } from "../../function/article/delete-article";
import { getArticles } from "../../function/article/get-articles";
import { getUserArticles } from "../../function/article/get-user-articles";
import { updateArticle } from "../../function/article/update-articles";
import type { ArticleSchema } from "../../types/article";

const router = Router();

router.get("/", async (_, response) => {
  try {
    const articles = await getArticles();
    return response.status(200).send({ articles });
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
});

router.get("/:userId/articles", async (request, response) => {
  const { userId } = request.params;
  const result = await getUserArticles(userId);

  if ("error" in result) {
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });
  }

  return response.status(200).send(result);
});

//TODO: CRIAR BUCKET PRA SALVAR IMAGEM
router.post("/", async (request, response) => {
  try {
    let fileUrl: string | null = null;
    const { userId, photoUrl, title, content } = request.body;

    if (!photoUrl) {
      fileUrl =
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fs2.glbimg.com%2F95FpFRrI5wD8oZnlDnJp8Vq0Bik%3D%2F0x88%3A690x558%2F690x470%2Fs.glbimg.com%2Fes%2Fge%2Ff%2Foriginal%2F2016%2F04%2F25%2Fribamar.jpg&f=1&nofb=1&ipt=a1f4007aefec58a612fb7728361a264f097d266156585f3a2eed968c4eb58453";
    }

    const result = await createArticle({
      content,
      photoUrl: fileUrl ?? photoUrl,
      title,
      userId,
    });
    if ("error" in result) {
      return response
        .status(result.status)
        .send({ error: result.error, message: result.message });
    }

    return response.status(201).send({ article: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
});

router.delete("/:articleId", async (request, response) => {
  try {
    const { articleId } = request.params;
    const result = await deleteArticle(articleId);

    if (typeof result !== "boolean") {
      return response
        .status(result.status)
        .send({ error: result.error, message: result.message });
    }
    return response.status(200).send({ success: result });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

router.put("/:articleId", async (request, response) => {
  try {
    const { articleId } = request.params;
    const articleById = await db.article.findFirst({
      where: {
        id: articleId,
      },
    });

    if (!articleById)
      return response.status(400).send({
        error: true,
        message: `O artigo com o id: ${articleId} não foi encontrado`,
      });

    const { content, photoUrl, title }: ArticleSchema = request.body;

    const result = await updateArticle({
      id: articleById.id,
      content,
      photoUrl,
      title,
      userId: articleById.userId,
    });

    if ("error" in result) {
      return response
        .status(result.status)
        .send({ error: result.error, message: result.message });
    }

    return response.status(200).send({ article: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export const articleRoutes = router;
