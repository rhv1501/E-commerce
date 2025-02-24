import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://avatar.iran.liara.run/public/job/operator/male",
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("AdminModel", adminSchema);
