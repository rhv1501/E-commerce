import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
let transporter;
transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export default transporter;
