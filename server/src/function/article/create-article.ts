import { db } from "../../db/client";
import type { ArticleSchema } from "../../types/article";
import type { ErrorSchema, TagSchema } from "../../types/index";

export async function createArticle({
  content,
  photoUrl,
  title,
  userId,
  tagIds,
}: ArticleSchema): Promise<ArticleSchema | ErrorSchema> {
  try {
    const userById = await db.user.findUnique({ where: { id: userId } });

    if (userById && userById.role !== "READER") {
      return {
        error: true,
        status: 400,
        message:
          "O usuário precisa ser da função 'WRITER' ou 'ADMIN' para escrever artigos",
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
    }

    const article = await db.article.create({
      data: {
        content,
        photoUrl,
        title,
        userId,
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
      await db.articleTags.createMany({
        data: tagIds.map((tagId: string) => ({
          articleId: article.id,
          tagId: tagId,
        })),
      });
    }

    const createdArticleWithTags = await db.article.findUnique({
      where: { id: article.id },
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

    return createdArticleWithTags as ArticleSchema;
  } catch (error) {
    console.error("Error in upsertArticle:", error);
    throw error;
  }
}
