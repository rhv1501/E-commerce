import Router from "express";
import upload from "../middlewares/upload.js";
import {
  addproducts,
  deleteproduct,
  order,
  orders,
  products,
  updateOrderStatus,
  updateproduct,
} from "../controllers/adminproductcontroller.js";
import verifyjwt from "../middlewares/verifyjwt.js";
const router = Router();

router.get("/orders", verifyjwt, orders);
router.get("/order/:id", verifyjwt, order);
router.get("/products", verifyjwt, products);
router.post("/products", verifyjwt, upload, addproducts);
router.delete("/products/:id", verifyjwt, deleteproduct);
router.put("/products/:id", verifyjwt, updateproduct);

//order status update route
router.put("/order/:id", verifyjwt, updateOrderStatus);

export default router;
