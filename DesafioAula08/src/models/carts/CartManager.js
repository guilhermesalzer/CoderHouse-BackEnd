import FileManager from "../utils/FileManager.js";

class CartManager {
  #id = 0;

  constructor(path) {
    this.path = path;
    this.fileManager = new FileManager();
  }

  getById = async (id) => {
    const carts = await this.fileManager.readFile(this.path);
    const cart = carts.find((cart) => cart.id === +id);

    if (!cart) {
      return "Não encontrado!";
    }

    return cart;
  };

  create = async (cart) => {
    cart.id = this.#id + 1;

    const carts = await this.fileManager.readFile(this.path);
    carts.push(cart);

    await this.fileManager.updateFile(this.path, carts);
  };

  addProductToCart = async (cartId, productId) => {
    const carts = await this.fileManager.readFile(this.path);

    const cart = carts.find((cart) => cart.id === +cartId);
    cart.products.push(productId);

    const indexCartFile = carts.findIndex(
      (cartFile) => cartFile.id === +cart.id
    );

    carts.splice(indexCartFile, 1);
    carts.push(cart);

    await this.fileManager.updateFile(this.path, carts);
  };
}

export default CartManager;
