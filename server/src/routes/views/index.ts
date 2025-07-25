import { Router } from "express";
import { createView } from "../../function/view/create-view";
import { validateUser } from "../../middleware/auth";

const router = Router();

router.use(validateUser);

router.post("/:userId/views/:articleId", async (request, response) => {
  const { userId, articleId } = request.params;
  const result = await createView({ articleId, userId });

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });

  return response.status(201).send(result);
});

export const viewRoute = router;
