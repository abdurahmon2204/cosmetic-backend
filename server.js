import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// .env faylini birinchi o'rinda yuklash kerak
dotenv.config();

// ES Modulesda __dirname bevosita mavjud emas, shuning uchun path.resolve() ishlatiladi.
const __dirname = path.resolve();

// JWT Secretni tekshirish
console.log("JWT Secret: ", process.env.JWT_SECRET);

connectDB();

const app = express();

// Middleware'lar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================================================
// 💡 Rasmlarni/Statik Fayllarni Serve Qilish (Tuzatilgan)
// Bu yerdagi '/uploads' manziliga kelgan so'rovlarni 
// loyiha ildizidagi 'uploads' katalogiga yo'naltiramiz.
// =========================================================
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 


// Routerlar
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server ${PORT}-portda ishga tushdi`)
);