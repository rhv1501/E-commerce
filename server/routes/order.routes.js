import { Router } from "express";
import Usermodel from "../models/User.model.js";
const router = Router();
import verifyjwt from "../middlewares/verifyjwt.js";
import authVerify from "../middlewares/authVerify.js";
import { placeorderfromcart } from "../controllers/ordercontroller.js";

router.post("/",verifyjwt,authVerify,placeorderfromcart)
export default router;
