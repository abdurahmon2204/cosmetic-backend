import express from "express";
import upload from "../middleware/upload.js";
import { getProducts, createProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);
router.delete("/:id", deleteProduct);

export default router;
