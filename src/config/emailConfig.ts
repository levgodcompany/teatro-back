import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail', // Servicio de correo electrónico (Gmail, Outlook, etc.)
    auth: {
      user: 'levgodcompany@gmail.com', // Usuario de correo electrónico
      pass: 'ecuu rnty oyze ubio', // Contraseña de correo electrónico
    },
  });