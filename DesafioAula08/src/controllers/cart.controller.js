import CartManager from "../carts/CartManager.js";

const manager = new CartManager("./src/data/carts.json");

const getById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await manager.getById(cid);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.body;
    const cart = await manager.addProductToCart(cartId, productId);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

const create = async function (req, res) {
  try {
    const { cart } = req.params;
    const cartCreated = await manager.create(cart);
    res.status(200).json(cartCreated);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export default { getById, addProductToCart, create };
