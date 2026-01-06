import express from "express";
import upload from "../middleware/upload.js";
import {
  getProducts,
  getProductById,    // bitta product controller
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Barcha products
router.get("/", getProducts);

// Bitta product
router.get("/:id", getProductById);

// Product yaratish
router.post("/", upload.single("image"), createProduct);

// Product o'chirish
router.delete("/:id", deleteProduct);

export default router;
