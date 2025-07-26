import { db } from "../../db/client";
import type { ErrorSchema, InterationSchema } from "../../types";

export async function createLike({
	articleId,
	userId,
}: InterationSchema): Promise<InterationSchema | ErrorSchema> {
	try {
		const userById = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!userById)
			return {
				error: true,
				status: 404,
				message: `Usuário com id: ${userId} não foi encontrado`,
			};

		const articleById = await db.article.findUnique({
			where: {
				id: articleId,
			},
		});

		if (!articleById)
			return {
				error: true,
				status: 404,
				message: `Artigo com id: ${articleId} não foi encontrado`,
			};

		const like = await db.like.create({
			data: {
				articleId: articleById.id,
				userId: userById.id,
			},
		});

		return like;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
