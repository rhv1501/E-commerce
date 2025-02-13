import bcrypt from "bcrypt";
import transporter from "../lib/emailTransporter.js";
import Usermodel from "../models/User.model.js";
const resetPasswordOtp = async (otp, email, res) => {
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    res.status(500).json({ message: "Email credentials are not set" });
    return;
  }
  let mailOptions = {
    from: "rhv4748@gmail.com",
    to: email,
    subject: "OTP for verification",
    text: `Your OTP is ${otp} (opt expires in 5 minutes)`,
  };
  const salt = bcrypt.genSaltSync(10);
  const hashedOtp = bcrypt.hashSync(otp, salt);
  const user = await Usermodel.findOne({ email });
  if (user) {
    user.resetotp = hashedOtp;
    user.resetexpiresOn = Date.now() + 5 * 60 * 1000;
    await user.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({ message: "Error sending OTP" });
        console.log(error);
        return;
      } else {
        console.log(info);
        res.status(200).json({ message: "OTP sent to email" });
        return;
      }
    });
  }
};
export default resetPasswordOtp;
