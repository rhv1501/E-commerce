import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyjwt = (req, res, next) => {
  const token = req.cookies?.token || null;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "UnAuthorized" });
    return;
  }
};
export default verifyjwt;
