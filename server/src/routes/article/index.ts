import { Router } from "express";
import { db } from "../../db/client";
import { deleteArticle } from "../../function/article/delete-article";
import { getArticles } from "../../function/article/get-articles";
import { upsertArticle } from "../../function/article/upsert-article";
import type { ArticleSchema } from "../../types/article";

const router = Router();

router.get("/", async (_, response) => {
  try {
    const articles = await getArticles();

    return response.status(200).send(articles);
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
});

//TODO: CRIAR BUCKET PRA SALVAR IMAGEM
router.post("/", async (request, response) => {
  try {
    let fileUrl: string | null = null;
    const { userId, photoUrl, title, content } = request.body;
    //TODO: ALGUM COMPORTAMENTO CASO NÃO TENHA UMA FOTO

    if (!photoUrl) {
      fileUrl =
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fs2.glbimg.com%2F95FpFRrI5wD8oZnlDnJp8Vq0Bik%3D%2F0x88%3A690x558%2F690x470%2Fs.glbimg.com%2Fes%2Fge%2Ff%2Foriginal%2F2016%2F04%2F25%2Fribamar.jpg&f=1&nofb=1&ipt=a1f4007aefec58a612fb7728361a264f097d266156585f3a2eed968c4eb58453";
    }
    const result = await upsertArticle({
      content,
      photoUrl: fileUrl ?? photoUrl,
      title,
      userId,
    });
    if (!result) return response.status(400).send("Deu erro aq pae");

    return response.status(201).send(result);
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
});

router.delete("/:articleId", async (request, response) => {
  try {
    const { articleId } = request.params;
    const deletedArticle = await deleteArticle(articleId);

    if (!deletedArticle)
      return response.status(400).send("This article not exists");

    return response.status(200).send({ success: true });
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
      return response
        .status(404)
        .send({ message: `Artigo com o id: ${articleId} não foi encontrado` });

    const existingUserById = await db.user.findFirst({
      where: {
        id: articleById.userId,
      },
    });

    if (!existingUserById)
      return response.status(404).send({
        message: `Usuário com o id: ${articleById.userId} não foi encontrado`,
      });

    if (existingUserById.role !== "WRITER") return null;

    const { content, photoUrl, title }: ArticleSchema = request.body;

    const existingArticleByTitle = await db.article.findFirst({
      where: {
        title: title,
      },
    });

    if (existingArticleByTitle)
      return response.status(400).send({
        message: `Artigo com o titulo: ${articleById.title} já existe`,
      });

    return response
      .status(200)
      .send({ result: articleById, salve: "salve salve" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
});

export const articleRoutes = router;
