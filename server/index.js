import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import path from "path";
import connectTodb from "./lib/Connect.Db.js";

const app = express();
dotenv.config();
app.use(express.json());
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectTodb();
});
