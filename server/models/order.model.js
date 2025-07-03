import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
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
