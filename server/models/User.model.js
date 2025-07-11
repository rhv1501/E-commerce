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
  gender: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  loggedin: {
    type: Boolean,
    default: false,
  },
  cartCount: {
    type: Number,
    default: 0,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      value: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
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
  resetotp: { type: String },
  resetexpiresOn: { type: Date },
  resetverified: {
    type: Boolean,
    default: false,
  },
  
  verified: {
    type: Boolean,
    default: false,
  },
});
const Usermodel = mongoose.model("Usermodel", UserSchema);
export default Usermodel;
