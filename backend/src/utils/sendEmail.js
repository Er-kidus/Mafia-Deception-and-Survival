import nodemailer from "nodemailer";
import config from "../config/config.js";

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: config.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendEmail;
