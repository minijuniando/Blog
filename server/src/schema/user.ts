import z from "zod";
import { roles } from "../types/user";

export async function validateSignup(
  body: unknown,
): Promise<z.infer<typeof signupSchema>> {
  const signupSchema = z
    .object({
      username: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(30, "Username muito longo.")
        .refine((name) => !name.includes(" "), {
          message: "Nome não pode conter espaços",
        }),
      email: z.email("Email inválido"),
      password: z
        .string()
        .min(6, "Senha deve ter pelo menos 6 caracteres")
        .refine((pass: string): boolean => !pass.includes(" "), {
          message: "Senha não pode conter espaços",
        }),
      confirmPassword: z.string("Confirmar senha é obrigatório."),
      role: z.enum(Object.values(roles), "Função inválida"),
    })
    .refine((data): boolean => data.password === data.confirmPassword, {
      error: "Senhas não coincidem",
      path: ["confirmPassword"],
    });

  return signupSchema.parseAsync(body);
}
