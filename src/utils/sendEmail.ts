import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.smtp_host,
  port: env.smtp_port,
  secure: false, // true only for 465
  auth: {
    user: env.smtp_user,
    pass: env.smtp_pass,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: `"Auth System" <${env.smtp_user}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;