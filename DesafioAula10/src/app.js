import express from "express";
import haandlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "./router/views.router.js";

const app = express();

const httpServer = app.listen(8080, () => {
  console.log("Server on na porta 8080");
});

const io = new Server(httpServer);

app.engine("handlebars", haandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
});

export default app;
