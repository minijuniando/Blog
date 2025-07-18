export const verifyEmailHtml = (name: string): string => {
	const verificationUrl = "";
	return `
        <div style="font-family: Arial, sans-serif; max-width: 601px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Bem-vindo a Comunidade Mini-Juniando!</h1>
          <p>Olá <strong>${name}</strong>,</p>
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
      `;
};
