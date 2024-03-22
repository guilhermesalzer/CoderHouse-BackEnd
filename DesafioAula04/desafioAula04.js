const fs = require("fs");

class FileManager {
  readFile = async (path) => JSON.parse(await fs.promises.readFile(path));
  createFile = async (path) => await fs.promises.writeFile(path, "");
  insertFile = async (path, data) =>
    await fs.promises.appendFile(path, JSON.stringify(data));
  deleteFile = async (path) => await fs.promises.unlink(path);
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
    this.#fileManager.createFile(path);
  }

  addProduct = async (product) => {
    this.#id += 1;
    product.id = this.#id;
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
        "thumbnail",
        "code",
        "stock",
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

  getProducts = async () => await this.#fileManager.readFile(this.path);

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
}
const main = async () => {
  const productManager = new ProductManager("./products.txt");
  await productManager.addProduct({
    title: "Product 1",
    description: "Product 1",
    price: 1200,
    thumbnail: "product1.jpg",
    stock: 10,
    code: 180,
  });

  await productManager.addProduct({
    title: "Product 2",
    description: "Product 2",
    price: 1500,
    thumbnail: "product2.jpg",
    stock: 30,
    code: 150,
  });

  await productManager.addProduct({
    title: "Product 3",
    description: "Product 3",
    price: 123,
    thumbnail: "product3.jpg",
    stock: 310,
    code: 100,
  });

  await productManager.updateProduct(1, {
    description: "Product 100",
  });
};

main();
