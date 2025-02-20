import { Router } from "express";
import {login,resetpassword}from "../controllers/adminauthcontoller.js"
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();
router.post("/login", login);
router.post("/resetpassword", verifyjwt, resetpassword);

export default router;
