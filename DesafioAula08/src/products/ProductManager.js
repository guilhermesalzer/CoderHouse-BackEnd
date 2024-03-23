import FileManager from "../utils/FileManager.js";

class ProductManager {
  #id = 0;
  #fileManager = new FileManager();

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct = async (product) => {
    this.#id += 1;
    product.id = this.#id;

    if (!product.status) {
      product.status = true;
    }
    this.products = this.#fileManager.readFile(this.path);

    const validProductCode = this.products.some(
      (prod) => prod.code === product.code
    );

    if (!validProductCode) {
      const productKeys = [
        "id",
        "title",
        "description",
        "price",
        "code",
        "stock",
        "status",
      ];

      const validProductKeys = productKeys.every((key) => {
        return key in product;
      });

      if (validProductKeys) {
        const validProductValues = Object.values(product).every((attr) => {
          return attr !== null;
        });

        if (validProductValues) {
          this.products.push(product);
          await this.#fileManager.updateFile(this.path, this.products);
        }
      }
    }
  };

  getProducts = async (limit = null) =>
    await this.#fileManager.readFile(this.path, limit);

  getProductById = async (id) => {
    const products = await this.#fileManager.readFile(this.path);
    const product = products.find((product) => product.id === id);

    if (!product) {
      return "Não encontrado!";
    }

    return product;
  };

  updateProduct = async (id, product) => {
    const productFile = await this.getProductById(id);
    Object.keys(product).forEach((key) => (productFile[key] = product[key]));

    const indexProductFile = this.products.findIndex(
      (product) => product.id === productFile.id
    );

    this.products.splice(indexProductFile, 1);
    this.products.push(productFile);

    await this.#fileManager.updateFile(this.path, this.products);
  };

  deleteProduct = async (id) => {
    const products = this.products.filter((prod) => prod.id !== +id);
    this.updateFile(this.path, products);
  };
}

export default ProductManager;
