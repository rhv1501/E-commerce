import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
import adminAuth from "./routes/admin.auth.routes.js";
import dotenv from "dotenv";
import path from "path";
import connectTodb from "./lib/Connect.Db.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.routes.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/admin/auth", adminAuth);
app.use("/api/order", orderRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectTodb();
});
