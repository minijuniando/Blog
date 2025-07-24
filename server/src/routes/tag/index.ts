import { Router } from "express";
import { createTag } from "../../function/tag/create-tag";
import { getTags } from "../../function/tag/get-tags";
import { validateUser } from "../../middleware/auth";
import { updateTag } from "../../function/tag/update-tag";

const router = Router();

router.use(validateUser);

router.post("/:name", async (request, response) => {
  const { name } = request.params;

  const result = await createTag(name);

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });

  return response.status(200).send({ tag: result });
});

router.get("/", async (_, response) => {
  const result = await getTags();

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });

  return response.status(200).send({ tags: result });
});

router.put("/:tagId", async (request, response) => {
  const { tagId } = request.params;
  const { name } = request.body;

  const result = await updateTag(tagId, name);

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });

  return response.status(200).send({ tag: result });
});

router.delete("/:tagId", async (request, response) => {
  const { tagId } = request.params;

  const result = await createTag(name);

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });

  return response.status(200).send({ tag: result });
});
