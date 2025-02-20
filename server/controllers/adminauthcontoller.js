import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
  const { email, password } = req.body;
  const result = adminModel.findone({ email });
  if (result) {
    const match = await bcrypt.compare(password, result.password);
    if (match) {
      res.status(200).json("Login Successfull");
      const token = jwt.sign({ email: result.email }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: false,
      });
    }
  } else {
    res.status(400).json("Invalid Credentials");
  }
};

const resetpassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await adminModel.findOne({ email: email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  const match = await bcrypt.compare(newPassword, user.password);
  if (match) {
    res
      .status(400)
      .json({ message: "new pass word cannot be as same as old one" });
  }
  if (isMatch) {
    user.password = newPassword;
  } else {
    res.status(400).json({ message: "Old password is incorrect" });
  }
};
export { login, resetpassword };
