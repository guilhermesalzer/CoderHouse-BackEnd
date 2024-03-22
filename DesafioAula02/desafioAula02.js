class ProductManager {
  #id = 0;
  constructor() {
    this.products = [];
  }

  addProduct = (product) => {
    this.#id += 1;
    product.id = this.#id;

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
        }
      }
    }
  };

  getProductById = (id) => {
    const product = this.products.filter((product) => product.id === id);
    if (!product || product.length == 0) {
      return "Não encontrado!";
    }

    return product;
  };
}

const productManager = new ProductManager();
productManager.addProduct({
  title: "Product 1",
  description: "Product 1",
  price: 1200,
  thumbnail: "product1.jpg",
  stock: 10,
  code: 100,
});

productManager.addProduct({
  title: "Product 2",
  description: "Product 2",
  price: 1500,
  thumbnail: "product2.jpg",
  stock: 30,
});

productManager.addProduct({
  title: "Product 2",
  description: "Product 2",
  price: null,
  thumbnail: "product2.jpg",
  stock: 30,
  code: 100,
});

const product2 = productManager.getProductById(20);

console.log(productManager.products);
console.log(product2);
