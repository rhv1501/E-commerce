import ProductModel from "../models/product.model.js";
import Usermodel from "../models/User.model.js";
const getprodcuts = (req, res) => {
  ProductModel.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json("Internal server error " + err);
    });
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await ProductModel.findById(id);
    const _id = req.user._id;
    const verifiedUser = await Usermodel.findById({ _id });
    const result = verifiedUser.cart.push({ productId: product._id, quantity });
    verifiedUser.totalPrice += product.price;
    const save = await verifiedUser.save();
    res.status(200).json("Product added to cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = req.user.user._id;
    const verifiedUser = await Usermodel.findById({ _id });
    const result = verifiedUser.cart.pull(id);
    const save = await verifiedUser.save();
    res.status(200).json("Product removed from cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

const getCart = async (req, res) => {
  try {
    const _id = req.user._id;
    const verifiedUser = await Usermodel.findById({ _id });
    res.json({ cart: verifiedUser.cart, totalPrice: verifiedUser.totalPrice });
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

export { getprodcuts, addToCart, removeFromCart, getCart };
