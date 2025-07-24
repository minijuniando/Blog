import { db } from "../../db/client";

export async function updateTag(tagId: string, name: string) {
  try {
    const tagById = await db.tag.findUnique({
      where: {
        id: tagId,
      },
    });
    if (!tagById)
      return {
        error: true,
        status: 400,
        message: "Tag com esse id não existe",
      };

    const tagByName = await db.tag.findUnique({
      where: {
        name,
      },
    });
    if (!tagByName)
      return {
        error: true,
        status: 400,
        message: "Tag com esse nome não existe",
      };

    const tag = await db.tag.update({
      where: {
        id: tagId,
      },
      data: {
        name,
      },
    });

    return tag;
  } catch (error) {
    console.log(error);
    return { error: true, status: 500, message: error as string };
  }
}
