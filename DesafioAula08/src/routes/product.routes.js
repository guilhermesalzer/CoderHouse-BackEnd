import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", productController.getAll);
productRouter.get("/:pid", productController.getProductById);
productRouter.post("/", productController.create);
productRouter.put("/:pid", productController.update);
productRouter.delete("/:pid", productController.deleteProduct);

export default productRouter;
