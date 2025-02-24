import Usermodel from "../models/User.model.js";
const authVerify = async (req, res, next) => {
  const email = req.body?.email || null;
  const user = await Usermodel.findOne({ email: email });
  if (user) {
    if (user.verified === false) {
      res.status(400).json({ message: "User not verified" });
      return;
    }
    req.verifieduser = user;
    next();
  }
  if (!user || email === null) {
    const _id = req.user.user_id;
    const reuser = await Usermodel.findOne({ _id });
    if (!reuser) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    if (reuser.verified === false) {
      res.status(400).json({ message: "User not verified" });
      return;
    }
    req.verifieduser = reuser;
    next();
  }
};

export default authVerify;
