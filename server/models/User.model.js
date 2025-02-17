import mongoose from "mongoose";
const schema = mongoose.Schema;

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
  },
  expiresOn: {
    type: Date,
  },
  resetotp: String,
  resetexpiresOn: Date,
  verified: {
    type: Boolean,
    default: false,
  },
});
const Usermodel = mongoose.model("Usermodel", UserSchema);
export default Usermodel;
