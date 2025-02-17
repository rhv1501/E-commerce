import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyjwt = (req, res, next) => {
  const token = req.cookies?.token || null;
  if (!token) {
    res.status(401).json({ message: "Unauthorized", error: "No token found" });
    return;
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found in .env file");
    }
    const result = jwt.verify(token, process.env.JWT_SECRET);
    req.user = result;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
    return;
  }
};
export default verifyjwt;
