import { Router } from "express";
import { verifypayment } from "../controllers/paymentcontroller";

const router = Router();

router.post("verifypayment", verifypayment);
export default router;
