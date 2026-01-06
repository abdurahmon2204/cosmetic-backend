import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Barcha productlar
router.get("/", getProducts);

// Bitta product
router.get("/:id", getProductById);

// Yangi product qo‘shish
router.post("/", createProduct);

// Product o‘chirish
router.delete("/:id", deleteProduct);

export default router;
