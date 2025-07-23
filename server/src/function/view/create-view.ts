import { response } from "express";
import { db } from "../../db/client";
import type { ErrorSchema, InterationSchema } from "../../types";

export async function createView({
	articleId,
	userId,
}: InterationSchema): Promise<InterationSchema | ErrorSchema> {
	const articleById = await db.article.findUnique({
		where: {
			id: articleId,
		},
	});
	if (!articleById)
		return {
			error: true,
			status: 404,
			message: `Artigo com id: ${articleId} não foi encontrado.`,
		};

	const userById = await db.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!userById)
		return {
			error: true,
			status: 404,
			message: `Usuário com id: ${userId} não foi encontrado.`,
		};

	const view = await db.view.create({
		data: {
			articleId,
			userId,
		},
	});

	return view;
}
