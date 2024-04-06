import { transporter } from "../config/emailConfig";

export async function sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: "levgodcompany@gmail.com",
      to,
      subject,
      text,
    };
  
    await transporter.sendMail(mailOptions);
  }