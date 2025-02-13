import Usermodel from "../models/User.model.js";
const authVerify = (req, res, next) => {
  const { email } = req.body;
  const user = Usermodel.findOne({ email: email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  if (user.verified === false) {
    res.status(400).json({ message: "User not verified" });
    return;
  }
  next();
};

export default authVerify;
