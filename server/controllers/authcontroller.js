import bcrypt from "bcrypt";
import Usermodel from "../models/User.model.js";
import sendotp from "../utils/sendOtp.js";
import transporter from "../lib/emailTransporter.js";
import resetPasswordOtp from "../utils/sendResetOtp.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;
    const userExists = await Usermodel.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyprofile = "https://avatar.iran.liara.run/public/boy";
    const girlprofile = "https://avatar.iran.liara.run/public/girl";
    const nogender = `https://avatar.iran.liara.run/username?username=${username}`;
    let profilePicture = "";
    switch (gender) {
      case "male":
        profilePicture = boyprofile;
        break;
      case "female":
        profilePicture = girlprofile;
        break;
      default:
        profilePicture = nogender;
        break;
    }
    const newUser = new Usermodel({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePicture,
    });
    const user = await newUser.save();
    const token = jwt.sign({ User_id: user._id }, process.env.JWT_SECRET);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    // });
    res.status(200).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
export const Sendotp = async (req, res) => {
  const _id = req.user.user_id;
  // console.log("from otp", _id);
  const user = await Usermodel.findOne({ _id });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  if (user.verified === false) {
    sendotp(req.otp, user.email, res);
  }
  if (user.verified) {
    res.status(200).json({ message: "user already verified" });
  }
};
export const verifyotp = async (req, res) => {
  const { otp } = req.body;
  const _id = req.user.user_id;
  console.log(_id);

  const user = await Usermodel.findOne({ _id });
  const isMatch = bcrypt.compareSync(otp, user.otp);
  if (
    user &&
    isMatch &&
    user.verified === false &&
    user.expiresOn > new Date()
  ) {
    user.verified = true;
    user.otp = null;
    user.expiresOn = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } else if (user.verified) {
    res.status(200).json({ message: "user already verified" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userExsists = await Usermodel.findOne({ email: email });
  if (!userExsists) {
    res.status(400).json({ message: "Bad Credentials" });
    return;
  }
  bcrypt.compare(password, userExsists.password, (err, result) => {
    if (err || !result) {
      res.status(400).json({ message: "Bad Credentials" });
      return;
    }
    const token = jwt.sign(
      { user_id: userExsists._id },
      process.env.JWT_SECRET
    );
    userExsists.loggedin = true;
    userExsists.save();
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: true,
    // });
    res.status(200).json({ message: "Login successful", token });
  });
};
export const logout = async (req, res) => {
  try {
    const _id = req.user.user_id;
    console.log(_id);
    const user = await Usermodel.findOne({ _id });
    user.loggedin = false;
    user.save();
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successful" });
  } catch (e) {
    res.status(500).json({ message: " Error Loging Out" });
    console.log(e);
  }
};
export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await req.verifieduser;
  console.log(user);
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  const check = await bcrypt.compare(newPassword, user.password);
  if (check) {
    res
      .status(400)
      .json({ message: "New Password must be different from old password" });
    return;
  }
  if (isMatch) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
    transporter.sendMail({
      from: "rhv4748@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: "Your password has been reset successfully if not done by you please contact us",
    });
    return;
  } else {
    res.status(400).json({ message: "Invalid Old Password" });
    return;
  }
};
export const getUser = async (req, res) => {
  const _id = req.user.user_id;
  console.log(_id);
  const user = await Usermodel.findOne({ _id })
    .select("-password")
    .populate("cart.productId");
  if (!user) {
    res.status(400).json({ message: "user not found" });
    return;
  }
  res.status(200).json({ user });
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  resetPasswordOtp(req.otp, email, res);
};
export const forgotpasswordOtpVerify = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await Usermodel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    if (user.resetverified) {
      res.status(400).json({ message: "OTP already verified" });
      return;
    }
    if (user.resetexpiresOn < new Date()) {
      res.status(400).json({ message: "OTP expired" });
      return;
    }
    const isMatch = await bcrypt.compare(otp, user.resetotp);
    if (isMatch) {
      user.resetverified = true;
      user.resetotp = null;
      user.resetexpiresOn = null;
      await user.save();
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await Usermodel.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    if (!user.resetverified) {
      res.status(400).json({ message: "OTP not verified" });
      return;
    }
    user.password = hashedPassword;
    user.resetverified = false;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
