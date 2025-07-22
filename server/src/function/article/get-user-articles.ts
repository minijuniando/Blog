import { db } from "../../db/client";
import type { ArticleSchema } from "../../types/article";

export async function getUserArticles(
  userId: string,
): Promise<ArticleSchema[]> {
  const userArticles = await db.article.findMany({
    where: {
      userId,
    },
  });

  return userArticles;
}
