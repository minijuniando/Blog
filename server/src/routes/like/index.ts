import { Router } from "express";
import { createLike } from "../../function/like/create-like";
import { deleteLike } from "../../function/like/delete-like";
import { validateUser } from "../../middleware/auth";

const router = Router();

router.use(validateUser);

router.post("/:userId/likes/:articleId", async (request, response) => {
	const { userId, articleId } = request.params;
	const result = await createLike({ articleId, userId });

	if ("error" in result) {
		return response
			.status(result.status)
			.send({ error: result.error, message: result.message });
	}

	return response.status(201).send({ like: result });
});

router.delete("/likes/:likeId", async (request, response) => {
	const { likeId } = request.params;
	const result = await deleteLike(likeId);

	if (typeof result !== "boolean")
		return response
			.status(result.status)
			.send({ error: true, message: result.message });

	return response.status(200).send({ success: result });
});

export const likeRoutes = router;
