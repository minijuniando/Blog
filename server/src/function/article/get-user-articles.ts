import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";
import type { ArticleSchema } from "../../types/article";

export async function getUserArticles(
  userId: string,
): Promise<ArticleSchema[] | ErrorSchema> {
  const userById = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userById)
    return {
      error: true,
      status: 404,
      message: `O usuário com id: ${userId} não existe`,
    };

  const userArticles = await db.article.findMany({
    where: {
      userId,
    },
    include: {
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

  return userArticles;
}
