import { Router } from "express";
import ProductModel from "../models/product.model";
import Usermodel from "../models/User.model";
const router = Router();

router.get("/", (req, res) => {
  ProductModel.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json("Internal server error " + err);
    });
});

router.post("/addToCart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    const user = req.user;
    const verifiedUser = await Usermodel.findById(user._id);
    const result = verifiedUser.cart.push(product);
    const total = await verifiedUser.totalPrice(
      verifiedUser.totalPrice + product.price
    );
    const save = await verifiedUser.save();
    res.status(200).json("Product added to cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
});
router.delete("/removeFromCart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const verifiedUser = await Usermodel.findById(user._id);
    const result = verifiedUser.cart.pull(id);
    const save = await verifiedUser.save();
    res.status(200).json("Product removed from cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
});

router.get("/cart", async (req, res) => {
  try {
    const user = req.user;
    const verifiedUser = await Usermodel.findById(user._id);
    res.json(verifiedUser.cart);
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
});

export default router;
