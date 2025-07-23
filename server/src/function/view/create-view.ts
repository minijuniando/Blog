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

	const view = await db.view.create({
		data: {
			articleId,
			userId,
		},
	});
}
