import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

export async function deleteArticle(
  articleId: string,
): Promise<ErrorSchema | boolean> {
  try {
    const articleById = await db.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!articleById)
      return { error: true, status: 400, message: "Esse artigo não existe" };

    await db.article.delete({
      where: {
        id: articleId,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return { error: true, status: 500, message: error as string };
  }
}
