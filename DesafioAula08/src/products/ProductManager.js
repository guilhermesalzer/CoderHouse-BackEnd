import { promises } from "fs";

class FileManager {
  readFile = async (path, limit = null) => {
    if (limit) {
      const objects = JSON.parse(await promises.readFile(path));
      return objects.slice(0, limit);
    }

    return JSON.parse(await promises.readFile(path));
  };
  createFile = async (path) => await promises.writeFile(path, "");
  insertFile = async (path, data) =>
    await promises.appendFile(path, JSON.stringify(data));
  deleteFile = async (path) => await promises.unlink(path);
  updateFile = async (path, data) => {
    await this.deleteFile(path);
    await this.createFile(path);
    await this.insertFile(path, data);
  };
}

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
          if (attr === null) {
            return false;
          }
          return true;
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
