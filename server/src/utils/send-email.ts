import { createTransport } from "nodemailer";
import { env } from "../common/env";

export async function sendEmail({}): Promise<void> {}
try {
	const transport = createTransport({
		host: "smtp.gmail.com",
		service: "gmail",
		port: 465,
		secure: true,
		auth: {
			user: env.MY_GMAIL,
			pass: env.MY_GMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: true,
		},
	});

	transport.sendMail({
		from: `Plush<${env.MY_GMAIL}>`,
	});
} catch (error) {
	console.error(error);
	throw error;
}
