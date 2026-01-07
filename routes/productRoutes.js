import express from "express";
import upload from "../middleware/upload.js";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
