import { db } from "../../db/client";
import {
	hashPassword,
	comparePassword,
	generateToken,
	generateVerificationToken,
	isValidEmail,
	isValidPassword,
} from "../utils/authUtils";
//import { sendEmail } from "../utils/sendEmail";
import type { Request, Response } from "express";

// Registrar usuário
export const signup = async (
	request: Request,
	response: Response,
): Promise<unknown> => {
	try {
		const { name, email, password, confirmPassword } = request.body;

		// validação de campos
		if (!name || !email || !password || !confirmPassword) {
			return response.status(400).json({
				success: false,
				message: "Todos os campos são obrigatórios",
			});
		}

		if (!isValidEmail(email)) {
			return response.status(400).json({
				success: false,
				message: "Email inválido",
			});
		}

		if (password !== confirmPassword) {
			return response.status(400).json({
				success: false,
				message: "Senhas não coincidem",
			});
		}

		if (!isValidPassword(password)) {
			return response.status(400).json({
				success: false,
				message: "Senha deve ter pelo menos 6 caracteres",
			});
		}

		if (name.length < 2) {
			return response.status(400).json({
				success: false,
				message: "Nome deve ter pelo menos 2 caracteres",
			});
		}

		if (name.includes(" ")) {
			return response.status(400).json({
				success: false,
				message: "Nome não pode conter espaços",
			});
		}

		const existingUser = await db.user.findUnique({
			where: { email: email.toLowerCase() },
		});

		if (existingUser) {
			return response.status(400).json({
				success: false,
				message: "Usuário já existe com este email",
			});
		}

		// Hash da senha
		const hashedPassword = await hashPassword(password);
		const verificationToken = generateVerificationToken();

		// Criar usuário
		const user = await db.user.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: hashedPassword,
				verificationToken,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				emailVerified: true,
				avatar: true,
				bio: true,
				createdAt: true,
			},
		});

		/* Enviar email de verificação
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      
      await sendEmail({
        to: user.email,
        subject: 'Verificação de Email - Blog Mini-Juniando',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; text-align: center;">Bem-vindo a Comunidade Mini-Juniando!</h1>
            <p>Olá <strong>${user.name}</strong>,</p>
            <p>Obrigado por se cadastrar! Clique no botão abaixo para verificar seu email:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #4CAF50; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 5px; display: inline-block;">
                Verificar Email
              </a>
            </div>
            <p>Se você não conseguir clicar no botão, copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              Este email foi enviado automaticamente. Se você não se cadastrou, pode ignorar este email.
            </p>
          </div>
        `
      });

    } 
    catch (emailError) {
      console.error('Erro ao enviar email de verificação:', emailError);
    } */
	} catch (error) {
		console.error("Erro no registro:", error);

		// Tratamento de erros específicos do Prisma
		if (error.code === "P2002") {
			return res.status(400).json({
				success: false,
				message: "Email já está em uso",
			});
		}

		res.status(500).json({
			success: false,
			message: "Erro interno do servidor",
		});
	}
};
