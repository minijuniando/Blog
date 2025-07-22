import { db } from "../../db/client";

export async function deleteArticle(articleId: string) {
  return await db.article.delete({
    where: {
      id: articleId,
    },
  });
}
