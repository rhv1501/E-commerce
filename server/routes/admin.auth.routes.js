import { Router } from "express";
import resetpass from "../controllers/adminauthcontroller.js";
import verifyjwt from "../middlewares/verifyjwt";
const router = Router();
router.post("/login",login)
router.post("/resetpassword",verifyjwt,resetpass)

export default router;
