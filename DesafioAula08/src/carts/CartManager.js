class CartManager {
  constructor() {
    this.carts = [];
  }

  getById = async (id) => {
    return this.carts.filter((cart) => cart.id === +id);
  };

  create = async (cart) => {};

  addProductToCart = async (cartId, productId) => {};
}
