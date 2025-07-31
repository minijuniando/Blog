export const verifyEmailHtml = (name: string, code: string): string => {
  return `
        <div style="font-family: Arial, sans-serif; max-width: 601px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Bem-vindo a Comunidade Mini-Juniando!</h1>
          <p>Olá <strong>${name}</strong>,</p>
          <p>Obrigado por se cadastrar! Aqui está seu código:</p>
          <div style="text-align: center; margin: 30px 0;">${code}</div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Este email foi enviado automaticamente. Se você não se cadastrou, pode ignorar este email.
          </p>
        </div>
      `;
};
