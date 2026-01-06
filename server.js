import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

// ENV o‘qish
dotenv.config();

// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads (rasmlar uchun)
app.use("/uploads", express.static(path.resolve("uploads")));

// Routes
app.use("/api/products", productRoutes);

// MongoDB ulanish
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB muvaffaqiyatli ulandi");
  } catch (error) {
    console.error("MongoDB xato:", error.message);
    process.exit(1);
  }
};

connectDB();

// PORT (Render o‘zi beradi)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
