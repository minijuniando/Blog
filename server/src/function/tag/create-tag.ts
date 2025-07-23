import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

type TagSchema = { id: string; name: string };

export async function createTag(
  name: string,
): Promise<TagSchema | ErrorSchema> {
  const tagByName = await db.tag.findUnique({
    where: {
      name,
    },
  });
  if (!tagByName || tagByName.name.toLowerCase().trim() === name)
    return { error: true, status: 400, message: "Essa tag já existe" };

  const tag = await db.tag.create({
    data: {
      name,
    },
  });

  return tag;
}
