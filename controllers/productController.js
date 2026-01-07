import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  res.json(await Product.find());
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product
    ? res.json(product)
    : res.status(404).json({ message: "Topilmadi" });
};

export const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const product = await Product.create({
    name,
    price,
    description,
    category,
    image
  });

  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "O‘chirildi" });
};
