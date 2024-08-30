import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./Routes/viewsRouter.js";
import { Server } from "socket.io";
import ProductDaoFs from "./persistence/daos/fileSystem/productDao.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import 'dotenv/config';
import passport from "passport";
import './passport/localStrategy.js';
import config from "./config.js";
import './persistence/db/conection.js';
import mainRouter from "./Routes/index.js";
import { logger } from "./utils/logger.js"
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {info} from "./docs/info.js"

const MainRouter = new mainRouter();
const app = express();

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    ttl: 1800,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUnitialized: true,
  cookie: {
    maxAge: 180000
  }
}

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(session(storeConfig))
app.use(cookieParser());

const productDaoFs = new ProductDaoFs("src/persistence/daos/fileSystem/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", MainRouter.getRouter());

app.use("/", viewsRouter);

app.use(errorHandler);



const PORT = config.PORT

const httpServer = app.listen(PORT, () =>
  logger.info(`Server ok: Port ${PORT}`)
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

