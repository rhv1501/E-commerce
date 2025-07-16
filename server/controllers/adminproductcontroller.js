import Order from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
export const orders = async (req, res) => {
  try {
    const user_id = req.user;
    if (!user_id) {
      res.status(200).json({ message: "user un-authorized" });
      return;
    }
    const orders = await Order.find()
      .populate("products.product_id")
      .populate("user_id", "name email phone")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e, message: "Internal server error" });
  }
};
export const order = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      res
        .status(400)
        .json({ error: true, success: false, message: "order not found" });
    }
    res.status(200).json({ error: false, success: true, order });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: true, success: false, message: e.message });
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
    const user_id = req.user;
    console.log(user_id);
    if (!user_id) {
      res.status(404).json({ message: "user un-authorized" });
      return;
    }
    const product = new ProductModel({
      name,
      description,
      price,
      imageuri: req.images,
      category,
      stock,
    });
    product.save();
    res.status(200).json({ message: "product added successfully", product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ messaage: "Internal server error", error: e });
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const updatedproduct = {};
    if (name) {
      updatedproduct.name = name;
    }
    if (description) {
      updatedproduct.description = description;
    }
    if (price) {
      updatedproduct.price = price;
    }
    if (category) {
      updatedproduct.category = category;
    }
    if (stock) {
      updatedproduct.stock = stock;
    }
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      res.status(403).json({ message: "product not found" });
    }
    product = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updatedproduct },
      { new: true }
    );
    res.status(200).json({ update: product });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
};
