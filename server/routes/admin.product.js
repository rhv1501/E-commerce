import Router from "express";
import { orders, products } from "../controllers/adminproductcontroller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/orders", verifyjwt, orders);
router.get("/products",verifyjwt,products)

export default router;
