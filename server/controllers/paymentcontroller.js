import crypto from "crypto";
export const verifypayment = async (re, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const secret = process.env.RAZORPAY_SECRET;
  const generated_signature = crypto.createHmac("sha256", secret);
  generated_signature.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = generated_signature.digest("hex");
  if (digest === process.env.RAZORPAY_SECRET) {
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
