import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "shipped", "Delivered"],
      default: "Pending",
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    receipt: {
      type: String,
      default: "",
    },
    razorpayid: { type: String, default: "" },
    shipping: {
      name: { type: String, required: true },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: { type: String, required: true },
      postal_code: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: { type: String, required: true },
    },
    tracking_number: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
