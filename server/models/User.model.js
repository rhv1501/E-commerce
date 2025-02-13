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
  otp: {
    type: String,
  },
  expiresOn: {
    type: Date,
  },
  resetotp:String,
  resetexpiresOn:Date,
  verified: {
    type: Boolean,
    default: false,
  },
});
const Usermodel = mongoose.model("Usermodel", UserSchema);
export default Usermodel;
