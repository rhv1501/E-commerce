import { Router } from "express";
import { verifypayment } from "../controllers/paymentcontroller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
import authverify from "../middlewares/authVerify.js";
const router = Router();

router.post("/verifypayment", verifyjwt, authverify, verifypayment);
export default router;
