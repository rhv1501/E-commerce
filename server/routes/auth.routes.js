import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  signup,
  login,
  verifyotp,
  resetPassword,
  forgotpassword,
  logout,
  getUser,
  Sendotp,
  forgotpasswordOtpVerify,
  changePassword,
} from "../controllers/authcontroller.js";
import genotp from "../middlewares/otpgenerator.js";
import authVerify from "../middlewares/authVerify.js";
import verifyjwt from "../middlewares/verifyjwt.js";
import Usermodel from "../models/User.model.js";
const router = Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  genotp,
  signup
);
router.get("/verifyuser", verifyjwt, (req, res) => {
  res.status(200).json({ message: "User is logged in" });
});
router.post("/sendotp", genotp, Sendotp);
router.post("/verify", verifyotp);
router.get("/user", verifyjwt, getUser);
router.post("/sendotp", verifyjwt, genotp, Sendotp);
router.post("/verify", verifyjwt, verifyotp);
router.post("/login", login);
router.post("/logout", verifyjwt, logout);
router.post("/resetpassword", verifyjwt, authVerify, resetPassword);
router.post("/forgotpassword", genotp, forgotpassword);
router.post("/forgotpasssword/otp/verify", forgotpasswordOtpVerify);
router.post("/forgotpassword/change", changePassword);
// router.get("/", verifyjwt, (req, res) => {
//   Usermodel.findById(req.user.user_id)
//     .then((user) => {
//       res.status(200).json({ user: user });
//     })
//     .catch((err) => {
//       res.status(400).json({ error: err });
//     });
// });
export default router;
