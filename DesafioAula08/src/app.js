import express, { json, urlencoded } from "express";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("api/products", productRouter);

export default app;
