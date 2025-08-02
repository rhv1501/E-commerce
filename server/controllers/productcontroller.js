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
    const _id = req.user.user_id;
    const verifiedUser = await Usermodel.findById(_id);
    if (!verifiedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(req.verifieduser);
    const value = quantity * product.price;
    const result = verifiedUser.cart.push({
      productId: product._id,
      quantity,
      value,
    });
    verifiedUser.totalPrice += quantity * product.price;
    verifiedUser.cartCount += 1;
    await verifiedUser.save();
    const updatedCart = await Usermodel.findById(verifiedUser._id)
      .select("cart totalPrice cartCount")
      .populate("cart.productId");

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart.cart,
      totalPrice: updatedCart.totalPrice,
      cartCount: updatedCart.cartCount,
    });
  } catch (err) {
    res.status(500).json("Internal server error " + err);
    console.log(err);
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // cart item's _id
    const _id = req.user.user_id;
    const verifiedUser = await Usermodel.findById(_id);
    if (!verifiedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (verifiedUser.cart.length === 0) {
      return res.status(404).json("Cart is empty");
    }

    const cartItemIndex = verifiedUser.cart.findIndex(
      (item) => item._id.toString() === id
    );

    if (cartItemIndex === -1) {
      return res.status(404).json("Cart item not found");
    }

    const item = verifiedUser.cart[cartItemIndex];

    verifiedUser.totalPrice -= item.value;
    verifiedUser.cartCount -= 1;

    if (verifiedUser.cartCount < 0) verifiedUser.cartCount = 0;
    if (verifiedUser.totalPrice < 0) verifiedUser.totalPrice = 0;

    verifiedUser.cart.pull({ _id: id });

    await verifiedUser.save();

    res.status(200).json("Product removed from cart successfully");
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

const getCart = async (req, res) => {
  try {
    const _id = req.user.user_id;
    const verifiedUser = await Usermodel.findById(_id);
    if (!verifiedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ cart: verifiedUser.cart, totalPrice: verifiedUser.totalPrice });
  } catch (err) {
    res.status(500).json("Internal server error " + err);
  }
};

export { getprodcuts, addToCart, removeFromCart, getCart, getspecifiedproduct };
