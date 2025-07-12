import Order from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import Razorpay from "razorpay";
const placeorderfromcart = async (req, res) => {
  const user = req.verifieduser;
  const cart = user.cart;
  if (cart.length === 0) {
    res.status(400).json({ message: "Cart is empty" });
    return;
  }
  const { address, city, postal_code, country, phone, name, state } = req.body;
  console.log(address, city, postal_code, country, phone, name, state);
  try {
    const products = await cart.map((item) => ({
      product_id: item.productId,
      value: item.value,
      quantity: item.quantity,
    }));
    console.log(products);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const rzporder = await razorpay.orders.create({
      amount: user.totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        user_id: user._id.toString(),
      },
    });
    if (!rzporder) {
      console.log("Failed to create Razorpay order");
      return res.status(500).json({ error: "Failed to create order" });
    }
    const order = new Order({
      products,
      total_price: user.totalPrice,
      shipping: {
        name,
        address,
        city,
        postal_code,
        country,
        phone,
        state,
      },
      receipt: rzporder.receipt,
      razorpayid: rzporder.id,
      user_id: user._id,
    });
    const result = await order.save();
    res.status(200).json({
      message: "order created succesfully",
      order_id: result._id,
      items: result.products,
      shipping: result.shipping,
      razorpay: rzporder,
    });
  } catch (e) {
    console.error(e);
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
      user_id: user._id,
    });
    await order.save();
    res.status(200).json({
      message: "order created succesfully",
      order_id: result._id,
      items: result.products,
      shipping: result.shipping,
    });
  } catch (e) {
    res.status(500).json({ message: "internal server error", error: e });
  }
};

const getorders = async (req, res) => {
  try {
    const user = req.verifieduser;
    const result = await Order.find({ user_id: user._id })
      .populate("products.product_id")
      .sort({ createdAt: -1 })
      .lean();
    console.log(result);
    res.status(200).json({ orders: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server error", error: e });
  }
};

export { placeorderfromcart, placeordeerofproduct, getorders };
