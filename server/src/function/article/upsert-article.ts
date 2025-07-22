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
    /*
     *    const article = await db.article.upsert({
      where: {
        id: id,
      },
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


     * */
    //return article;
  } catch (error) {
    console.error("Error in upsertArticle:", error);
    throw error;
  }
}
