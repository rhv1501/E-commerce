import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  signup,
  login,
  verifyotp,
  resetPassword,
  forgotpassword,
  logout,
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

router.post("/verify", verifyotp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetpassword", verifyjwt, authVerify, resetPassword);
router.post("/forgotpassword", verifyjwt, authVerify, genotp, forgotpassword);
router.get("/", verifyjwt, (req, res) => {
  Usermodel.findById(req.user.user_id)
    .then((user) => {
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
export default router;
