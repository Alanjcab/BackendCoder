import { Router } from "express";
import productsRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";
import userRouter from "./userRouter.js";
import ticketRouter from "./ticketRouter.js"

export default class mainRouter{
    constructor(){
        this.router = Router();
        this.init();
    }
    init(){
        this.router.use("/carts", cartRouter);
        this.router.use("/products", productsRouter);
        this.router.use("/users", userRouter);
        this.router.use("/ticket", ticketRouter);
    }
    getRouter(){
        return this.router;
    }
};



