import nodemailer from 'nodemailer'

const EMAIL = <string>process.env.EMAIL_USER;
const PASS = <string>process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
    service: 'gmail', // Servicio de correo electrónico (Gmail, Outlook, etc.)
    auth: {
      user: EMAIL, // Usuario de correo electrónico
      pass: PASS, // Contraseña de correo electrónico
    },
  });

// Función para enviar el correo electrónico
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
      // Configurar el objeto de opciones para enviar el correo electrónico
      const mailOptions = {
          from: EMAIL, // Remitente
          to, // Destinatario
          subject, // Asunto del correo electrónico
          text, // Cuerpo del correo electrónico (en texto plano)
      };

      // Enviar el correo electrónico usando el transportador
      const info = await transporter.sendMail(mailOptions);
      return info;
  } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw error; // Puedes manejar el error según tus necesidades
  }
};