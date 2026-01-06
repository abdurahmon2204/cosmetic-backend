import Product from "../models/Product.js";

// GET — barcha mahsulotlar
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET — bitta mahsulot by id
// Bitta product olish
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST — mahsulot qo‘shish (image local server)
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      price,
      description,
      category,
      image,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE — mahsulot o‘chirish
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Mahsulot o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
