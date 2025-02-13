import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
let transporter;
// try {
//   if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
//     throw new Error(
//       "Environment variables EMAIL and EMAIL_PASSWORD must be set"
//     );
//   }

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
// } catch (error) {
//   console.log("error creating transporter", error);
// }
export default transporter;
