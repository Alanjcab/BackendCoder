import { Router } from "express";
import productsRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/api/carts", cartRouter);
router.use("/api/products", productsRouter);
router.use("/api/users", userRouter);

export default router;