import { db } from "../../db/client";
import { handleSendEmail } from "../../utils/send-email";
import type { Request, Response } from "express";
import { verifyEmailHtml } from "../../utils/html/verify-email";
import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../common/env";

export const signup = async (
	request: Request,
	response: Response,
): Promise<unknown> => {
	try {
		const { username, email, password, confirmPassword } = request.body;

		if (!username || !email || !password || !confirmPassword) {
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

		if (password.length < 6)
			return response.status(400).json({
				success: false,
				message: "Senha deve ter pelo menos 6 caracteres",
			});

		if (username.length < 6) {
			return response.status(400).json({
				success: false,
				message: "Nome deve ter pelo menos 2 caracteres",
			});
		}

		if (username.includes(" ")) {
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

		const hashedPassword = await bcrypt.hash(password, 8);
		const user = await db.user.create({
			data: {
				username: username,
				email: email.toLowerCase(),
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				photoUrl: true,
				bio: true,
				createdAt: true,
			},
		});

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			env.TOKEN_SECRET,
		);

		try {
			await handleSendEmail({
				userEmail: user.email,
				subject: "Verificação de Email - Blog Mini-Juniando",
				html: verifyEmailHtml(user.name),
			});
		} catch (emailError) {
			console.error("Erro ao enviar email de verificação:", emailError);
		}
		return response
			.status(201)
			.send({ jwt: token, id: user.id, email: user.email });
	} catch (error) {
		console.error(chalk.red(error));

		response.status(500).json({
			success: false,
			message: "Erro interno do servidor",
		});
	}
};
