import { Router } from "express";
import { verifypayment } from "../controllers/paymentcontroller.js";

const router = Router();

router.post("/verifypayment", verifypayment);
export default router;
