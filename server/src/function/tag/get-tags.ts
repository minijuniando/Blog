import { db } from "../../db/client";
import type { ErrorSchema, TagSchema } from "../../types";

export async function getTags(): Promise<TagSchema[] | ErrorSchema> {
  try {
    const tags = await db.tag.findMany();

    return tags;
  } catch (error) {
    console.log(error);
    return { error: true, status: 500, message: error as string };
  }
}
