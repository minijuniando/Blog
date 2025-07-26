import type { UserRole } from "@prisma/client";
import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";
import { roles, type UserSchema } from "../../types/user";

export async function changeUserRole(
  userId: string,
  targetId: string,
  role: UserRole,
): Promise<UserSchema | ErrorSchema> {
  const userById = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  if (userById && userById.role !== "ADMIN")
    return {
      error: true,
      status: 401,
      message: "O usuário deve ser 'ADMIN' para alterar o cargo de alguém",
    };
  if (!Object.values(roles).includes(role))
    return {
      error: true,
      status: 400,
      message: `A função: ${role} não existe.`,
    };
  const targetUserById = await db.user.findUnique({
    where: {
      id: targetId,
    },
  });

  if (!targetUserById)
    return {
      error: true,
      status: 400,
      message: "O usuário que você deseja alterar o cargo não existe",
    };

  const result = await db.user.update({
    where: {
      id: targetUserById.id,
    },
    data: {
      role: role as UserRole,
    },
  });

  return result;
}
