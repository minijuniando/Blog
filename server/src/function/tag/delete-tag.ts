import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

export async function deleteTag(tagId: string): Promise<boolean | ErrorSchema> {
  try {
    const tagById = await db.tag.delete({
      where: {
        id: tagId,
      },
    });

    if (!tagById)
      return { error: true, status: 400, message: "Essa tag não existe" };

    await db.tag.delete({
      where: {
        id: tagId,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
