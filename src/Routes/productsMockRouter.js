import { Router } from "express";
import productController from "../controllers/productController.js";

const router = Router();
const controller = new productController();

router.post('/', controller.createProductM)
router.get('/', controller.getProductsM)

export default router;