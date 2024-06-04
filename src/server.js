import express from "express";
import productsRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRouter.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./Routes/viewsRouter.js";
import { Server } from "socket.io";
import ProductDaoFs from "./daos/fileSystem/productDao.js";
import { initMongoDb } from "./daos/mongoDb/conection.js";

const app = express();

const productDaoFs = new ProductDaoFs("src/daos/fileSystem/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

app.use("/carts", cartRouter);
app.use("/products", productsRouter);

app.use(errorHandler);

initMongoDb();

const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server ok on porto ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("newProduct", async (product) => {
    try {
      await productDaoFs.addProduct(product);

      const products = await productDaoFs.getProducts();

      socketServer.emit("products", products);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  });

  socket.on("deleteProduct", async (productId) => {
    try {
      await productDaoFs.deleteProduct(productId);

      const products = await productDaoFs.getProducts();

      socket.emit("products", products);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  });
});
