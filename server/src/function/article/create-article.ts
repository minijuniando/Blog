import { db } from "../../db/client";
import type { ArticleSchema } from "../../types/article";

export async function upsertArticle({
  id,
  content,
  photoUrl,
  title,
  userId,
}: ArticleSchema): Promise<ArticleSchema | null> {
  try {
    const existingUserById = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    const existingArticleByTitle = await db.article.findFirst({
      where: {
        title,
      },
    });

    if (!existingUserById) return null;

    if (existingUserById.role !== "WRITER") return null;
    if (existingArticleByTitle) return null;

    const article = await db.article.upsert({
      create: {
        content,
        photoUrl,
        title,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        content,
        photoUrl,
        title,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });

    return article;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
