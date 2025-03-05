import Router from "express";
import {
  addproducts,
  deleteproduct,
  orders,
  products,
  updateproduct,
} from "../controllers/adminproductcontroller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/orders", verifyjwt, orders);
router.get("/products", verifyjwt, products);
router.post("/products", verifyjwt, addproducts);
router.delete("/products/:id", verifyjwt, deleteproduct);
router.put("/products/:id", verifyjwt, updateproduct);

export default router;
