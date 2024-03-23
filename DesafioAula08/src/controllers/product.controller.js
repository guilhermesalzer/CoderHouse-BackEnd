import ProductManager from "../products/ProductManager.js";
import path from "path";

const __dirname = path.resolve();
const dataBaseLocation = __dirname + "/src/data/products.json";

const productManager = new ProductManager(dataBaseLocation);

const getAll = async (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const products = await productManager.getProducts(limit);
    return res.status(200).json(products);
  }
  const products = await productManager.getProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(+pid);

  return res.status(200).json(product);
};

const create = async (req, res) => {
  await productManager.addProduct(req.body);
  return res.status(200).json({ message: "Product created" });
};

const update = async (req, res) => {
  const { pid } = req.params;
  await productManager.updateProduct(pid, req.body);
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProduct(pid);
};

export default { getAll, getProductById, create, update, deleteProduct };
