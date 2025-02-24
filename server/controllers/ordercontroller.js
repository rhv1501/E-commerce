import Order from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
const placeorderfromcart = async (req, res) => {
  const user = req.verifieduser;
  const cart = user.cart;
  if (cart.length === 0) {
    res.status(400).json({ message: "Cart is empty" });
    return;
  }
  const { shiipingaddress, city, postalcode, country } = req.body;
  try {
    const order = new Order({
      products: [
        {
          product_id: cart.product_id,
          name: cart.name,
          price: cart.price,
          quantity: cart.quantity,
        },
      ],
      total_price: cart.totalPrice,
      shippingAddress: {
        shiipingaddress,
        city,
        postalcode,
        country,
      },
      user: user._id,
    });
    const result = await order.save();
    res.staus(200).json({
      message: "order created succesfully",
      order_id: result._id,
      items: result.products,
      shipping: result.shipping,
    });
  } catch (e) {
    res.status(500).json({ error: "internal server error", message: e });
  }
};

const placeordeerofproduct = async (req, res) => {
  const { id } = req.params;
  const { shiipingaddress, city, postalcode, country, quantity } = req.body;
  try {
    const product = ProductModel.findOne({ _id: id });
    const order = new Order({
      products: [
        {
          prodcuct_id: product._id,
          name: product.name,
          price: product.price,
          quantity,
        },
      ],
      total_price: product.price,
      shippingAddress: {
        shiipingaddress,
        city,
        postalcode,
        country,
      },
      user: user._id,
    });
    await order.save();
    res.staus(200).json({
      message: "order created succesfully",
      order_id: result._id,
      items: result.products,
      shipping: result.shipping,
    });
  } catch (e) {
    res.status(500).json({ message: "internal server error", error: e });
  }
};

const getorders = (req, res) => {
  try {
    const user = req.verifieduser;
    const result = Order.find({ user_id: user._id });
    res.status(200).json({ orders: result });
  } catch (e) {
    res.status(500).json({ message: "internal server error", error: e });
  }
};

export { placeorderfromcart, placeordeerofproduct, getorders };
