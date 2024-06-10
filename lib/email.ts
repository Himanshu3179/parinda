import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer";

async function sendPasswordResetEmail(
  email: string,
  link: string
): Promise<SentMessageInfo> {
  let transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${link}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return transporter.sendMail(mailOptions);
}

export { sendPasswordResetEmail };
