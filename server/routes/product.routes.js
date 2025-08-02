import { Router } from "express";
import {
  getprodcuts,
  addToCart,
  removeFromCart,
  getCart,
  getspecifiedproduct,
} from "../controllers/productcontroller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/", getprodcuts);
router.get("/:id", getspecifiedproduct);

router.post("/addToCart/:id", verifyjwt, addToCart);
router.delete("/removeFromCart/:id", verifyjwt, removeFromCart);

router.get("/cart", verifyjwt, getCart);

export default router;
