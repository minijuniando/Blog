import { db } from "../../db/client";

export async function getArticles() {
  try {
    const articles = await db.article.findMany();

    return articles;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
