import { db } from "../../db/client";
import type { ErrorSchema, TagSchema } from "../../types";

export async function createTag(
  name: string,
): Promise<TagSchema | ErrorSchema> {
  const tagByName = await db.tag.findUnique({
    where: {
      name,
    },
  });
  if (tagByName)
    return { error: true, status: 400, message: "Essa tag já existe" };

  const tag = await db.tag.create({
    data: {
      name,
    },
  });

  return tag;
}
