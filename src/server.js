import express from "express";
import producysRouter from "./Routes/productRouter.js";
import cartRouter from './Routes/cartRouter.js';
import morgan from 'morgan';
import {errorHandler} from './middlewares/errorHandler.js'

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'))

app.use("/api/carts", cartRouter);
app.use("/api/products", producysRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on porto ${PORT}`));
