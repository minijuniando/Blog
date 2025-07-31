import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";
import type { ArticleSchema } from "../../types/article";

export async function updateArticle({
  id,
  content,
  photoUrl,
  title,
  userId,
  tagIds,
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

    if (title) {
      const articleByTitle = await db.article.findUnique({
        where: {
          title,
        },
      });

      if (articleByTitle && articleByTitle.id !== id)
        return {
          error: true,
          status: 400,
          message: `O artigo com o titulo: ${title} já existe`,
        };
    }

    if (tagIds && tagIds.length > 0) {
      const existingTags = await db.tag.findMany({
        where: {
          id: {
            in: tagIds,
          },
        },
      });

      if (existingTags.length !== tagIds.length) {
        return {
          error: true,
          status: 400,
          message: "Uma ou mais tags não foram encontradas",
        };
      }

      await db.articleTags.deleteMany({
        where: {
          articleId: id,
        },
      });

      await db.articleTags.createMany({
        data: tagIds.map((tagId) => ({
          articleId: id as string,
          tagId,
        })),
      });
    }

    const article = await db.article.update({
      where: {
        id,
      },
      data: {
        content,
        photoUrl,
        title,
        userId,
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

    if (tagIds && tagIds.length > 0) {
      await db.articleTags.deleteMany({
        where: {
          articleId: id,
        },
      });

      await db.articleTags.createMany({
        data: tagIds.map((tagId) => ({
          articleId: id as string,
          tagId,
        })),
      });
    }

    const updatedArticleWithTags = await db.article.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        title: true,
        content: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return updatedArticleWithTags as ArticleSchema;
  } catch (error) {
    console.error("Error in updateArticle:", error);
    throw error;
  }
}
