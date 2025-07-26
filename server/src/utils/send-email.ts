import { createTransport } from "nodemailer";
import { env } from "../common/env";
import type { SendEmailParams } from "../types/user";

export async function handleSendEmail({
  userEmail,
  subject,
  html,
}: SendEmailParams): Promise<void> {
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
      from: `Mini-Juniando<${env.MY_GMAIL}>`,
      to: userEmail,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
