import { request } from "express";
import Order from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
export const orders = (req, res) => {
  try {
    const user_id = req.user.user_id;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
    }
    const orders = Order.find();
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ error: e, message: "Internal server error" });
  }
};

export const products = (req, res) => {
  try {
    const user_id = req.user.user_id;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
    }
    const products = ProductModel.find();
    res.status(200).json({ products });
  } catch (e) {
    res.status(500).json({ error: e, message: "Internal server error" });
  }
};
export const addproducts = (req, res) => {};
