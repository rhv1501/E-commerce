import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
import adminAuth from "./routes/admin.auth.routes.js";
import adminProduct from "./routes/admin.product.js";
import dotenv from "dotenv";
import path from "path";
import connectTodb from "./lib/Connect.Db.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.routes.js";
import paymentRoute from "./routes/pay.routes.js";
const app = express();
dotenv.config();
const corsOption = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "public")));
app.use(morgan("dev"));
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/admin/auth", adminAuth);
app.use("/admin", adminProduct);
app.use("/api/order", orderRoutes);
app.use("/api/payments", paymentRoute);
app.get("/public/uploads/:productname/:imagename", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      `public/uploads/${req.params.productname}/${req.params.imagename}`
    )
  );
});
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.listen(5050, () => {
  console.log("Server is running on port 5050");
  connectTodb();
});
