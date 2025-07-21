import { db } from "../../db/client";
import { ArticleSchema } from "../../types/article";
// Article service

export async function createArticle({
  content,
  photoUrl,
  title,
  userId,
}: ArticleSchema) {
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

    const article = await db.article.create({
      data: {
        content,
        photoUrl,
        title,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return article;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
