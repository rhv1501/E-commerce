import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { blacklistedModel } from "../models/blacklisted.model.js";
dotenv.config();
const verifyjwt = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({ message: "Unauthorized", error: "No token found" });
    return;
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in .env file");
    }
    const tmodel = await blacklistedModel.findOne({ token });
    if (tmodel) {
      res
        .status(401)
        .json({ message: "Unauthorized", error: "Token is blacklisted" });
      return;
    }
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.user = result;
    console.log(result);
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
    return;
  }
};
export default verifyjwt;
