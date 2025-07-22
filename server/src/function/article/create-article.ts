import { db } from "../../db/client";
import type { ArticleSchema } from "../../types/article";
import type { ErrorSchema } from "../../types/index";

export async function createArticle({
  content,
  photoUrl,
  title,
  userId,
}: ArticleSchema): Promise<ArticleSchema | ErrorSchema> {
  try {
    const userById = await db.user.findUnique({ where: { id: userId } });

    if (userById && userById.role !== "WRITER") {
      return {
        error: true,
        status: 400,
        message:
          "O usuário precisa ser da função 'WRITER' para escrever artigos",
      };
    }

    const articleByTitle = await db.article.findUnique({
      where: {
        title,
      },
    });

    if (articleByTitle)
      return {
        error: true,
        status: 400,
        message: `O artigo com o titulo: ${title} já existe`,
      };

    const article = await db.article.create({
      data: {
        content,
        photoUrl,
        title,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        title: true,
        content: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return article;
  } catch (error) {
    console.error("Error in upsertArticle:", error);
    throw error;
  }
}
