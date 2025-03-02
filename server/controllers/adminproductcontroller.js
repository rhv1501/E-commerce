import Order from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
export const orders = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
      return;
    }
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ error: e, message: "Internal server error" });
  }
};

export const products = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
      return;
    }
    const products = await ProductModel.find();
    res.status(200).json({ products });
  } catch (e) {
    res.status(500).json({ error: e, message: "Internal server error" });
  }
};
export const addproducts = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const user_id = req.user.user_id;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
      return;
    }
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      stock,
    });
    product.save();
    res.status(200).json({ message: "product added successfully", product });
  } catch (e) {
    res.status(500).json({ messaage: "Internal server error", error: e });
  }
};

export const deleteproduct = (req, res) => {};
