import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/:cid", cartController.getById);
cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);
cartRouter.post("/", cartController.create);

export default cartRouter;
