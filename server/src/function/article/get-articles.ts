import { db } from "../../db/client";

export async function getArticles() {
  try {
    const articles = await db.article.findMany({
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

    return articles;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
