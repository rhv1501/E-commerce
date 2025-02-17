import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import adminAuth from "./routes/admin.auth.routes.js";
import dotenv from "dotenv";
import path from "path";
import connectTodb from "./lib/Connect.Db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/admin/auth", adminAuth);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectTodb();
});
