import { Router } from "express";
import { changeUserRole } from "../../function/user/change-user-role";
import { validateUser } from "../../middleware/auth";
import type { JwtPayload } from "../../types/";
import { updateUser } from "../../function/user/update-user";

const router = Router();

router.use(validateUser);

router.put("/:targetId/role", async (request, response) => {
  const { id: userId } = request.user as JwtPayload;
  const { targetId } = request.params;
  const { role } = request.body;

  const result = await changeUserRole(userId, targetId, role);

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });
});

router.put("/", async (request, response) => {
  const { id } = request.user as JwtPayload;
  const { username, email, password, photoUrl } = request.body;

  const result = await updateUser({ id, username, email, password, photoUrl });

  if ("error" in result)
    return response
      .status(result.status)
      .send({ error: result.error, message: result.message });
});

export const userRoutes = router;
