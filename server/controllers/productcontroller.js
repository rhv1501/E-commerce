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
const getspecifiedproduct = (req, res) => {
  const { id } = req.params;
  ProductModel.findById(id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json("Internal server error " + err);
    });
};

const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await ProductModel.findById({ _id: id });
    const verifiedUser = req.verifieduser;
    console.log(req.verifieduser);
    const result = verifiedUser.cart.push({ productId: product._id, quantity });
    verifiedUser.totalPrice += quantity * product.price;
    await verifiedUser.save();
    res.status(200).json("Product added to cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
    console.log(err);
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json("Product not found");
    }
    const verifiedUser = req.verifieduser;
    if(verifiedUser.cart.length === 0){
      return res.status(404).json("Cart is empty");
    }
    const cartItemIndex = await verifiedUser.cart.findIndex(
      (item) => item.productId.toString() === id
    );
    const item = verifiedUser.cart[cartItemIndex];
    verifiedUser.totalPrice -= item.quantity * product.price;
    const result = await verifiedUser.cart.pull({ productId: id });
    const save = await verifiedUser.save();
    res.status(200).json("Product removed from cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

const getCart = async (req, res) => {
  try {
    const verifiedUser = req.verifiedUser;
    res.json({ cart: verifiedUser.cart, totalPrice: verifiedUser.totalPrice });
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

export { getprodcuts, addToCart, removeFromCart, getCart, getspecifiedproduct };
