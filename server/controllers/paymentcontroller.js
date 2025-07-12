import crypto from "node:crypto";
import Order from "../models/order.model.js";
export const verifypayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const secret = process.env.RAZORPAY_SECRET;
  const generated_signature = crypto.createHmac("sha256", secret);
  generated_signature.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = generated_signature.digest("hex");
  if (digest === razorpay_signature) {
    const update = await Order.updateOne(
      { razorpayid: razorpay_order_id },
      {
        $set: {
          payment_status: "Paid",
          status: "Confirmed",
          razorpay_payment_id: razorpay_payment_id,
        },
      }
    );
    if (!update) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Failed to update order status",
      });
    }
    const user = req.verifieduser;
    user.cart = [];
    user.cartCount = 0;
    user.totalPrice = 0;
    await user.save();
    res.status(200).json({
      success: true,
      error: false,
      message: "Payment verified successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      error: true,
      message: "Payment verification failed",
    });
  }
};
