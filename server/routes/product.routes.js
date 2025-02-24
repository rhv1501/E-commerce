import { Router } from "express";
import { getprodcuts, addToCart,removeFromCart,getCart, getspecifiedproduct } from "../controllers/productcontroller.js";
import authVerify from "../middlewares/authVerify.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/", getprodcuts);
router.get("/:id",getspecifiedproduct)

router.post("/addToCart/:id",verifyjwt,authVerify,addToCart);
router.delete("/removeFromCart/:id", verifyjwt,authVerify,removeFromCart);

router.get("/cart", verifyjwt,authVerify,getCart);

export default router;
