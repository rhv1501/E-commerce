import { Router } from "express";
import { getprodcuts, addToCart,removeFromCart,getCart } from "../controllers/productcontroller.js";
import authVerify from "../middlewares/authVerify.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/", getprodcuts);

router.post("/addToCart/:id",verifyjwt,authVerify,addToCart);
router.delete("/removeFromCart/:id", verifyjwt,authVerify,removeFromCart);

router.get("/cart", getCart);

export default router;
