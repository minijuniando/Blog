import { db } from "../../db/client";
import type { ErrorSchema } from "../../types";
import type { UserSchema } from "../../types/user";

type updateUserParams = {
  id: string;
  email: string;
  username: string;
  password: string;
  photoUrl: string;
};
export async function updateUser({
  id,
  username,
  email,
  password,
  photoUrl,
}: updateUserParams): Promise<UserSchema | ErrorSchema> {
  const userById = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!userById)
    return {
      error: true,
      status: 400,
      message: `Usuário com id: ${id} não existe`,
    };

  const userByUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!userByUsername)
    return {
      error: true,
      status: 400,
      message: "Este username já é utilizado",
    };

  const userByEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!userByEmail)
    return {
      error: true,
      status: 400,
      message: "Este email já é utilizado",
    };

  const result = await db.user.update({
    where: {
      id: userById.id,
    },
    data: {
      username,
      email,
      password,
      photoUrl,
    },
  });
  return result;
}
