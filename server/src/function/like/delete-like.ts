import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";

export async function deleteLike(
	likeId: string,
): Promise<boolean | ErrorSchema> {
	try {
		const likeById = await db.like.findUnique({
			where: {
				id: likeId,
			},
		});

		if (!likeById)
			return {
				error: true,
				status: 404,
				message: "Esse artigo não tem like!",
			};

		await db.like.findUnique({
			where: {
				id: likeId,
			},
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
	return true;
}
