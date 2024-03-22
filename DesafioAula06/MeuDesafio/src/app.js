import express, { json, urlencoded } from "express";
const productRouter = require("./routes/product.routes");
app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
