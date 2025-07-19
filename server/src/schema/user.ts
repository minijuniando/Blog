import type { Request } from "express";
import z from "zod";
import { roles } from "../types/user";

export async function validateSignup(
  body: unknown,
): Promise<z.infer<typeof signupSchema>> {
  const signupSchema = z.object({
    username: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(30, "Username too long")
      .refine((name) => !name.includes(" "), {
        message: "Nome não pode conter espaços",
      }),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string("Confirm password is required")
      .refine((data) => data.password === data.confirmPassword, {
        message: "Senhas não coincidem",
        path: ["confirmPassword"],
      }),
    role: z.enum(Object.values(roles), "Invalid role"),
  });
  return signupSchema.parseAsync(body);
}
