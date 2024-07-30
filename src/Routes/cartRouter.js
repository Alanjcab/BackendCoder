import { Router } from "express";
import cartController from "../controllers/cartController.js"
import { isAuth } from "../middlewares/isAuth.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

const controller = new cartController();

const router = Router();


router.get('/', [isAuth, checkAdmin], controller.getAll);
router.post('/', [isAuth, checkAdmin], controller.create);
router.get('/:id', [isAuth], controller.getById)
router.put('/:id', [isAuth, checkAdmin], controller.update)
router.delete('/:id', [isAuth, checkAdmin], controller.delete)
router.post('/products/:idProd', [isAuth], controller.addProdToCart)
router.delete('/:idCart/products/:idProd', [isAuth], controller.removeProdToCart)
router.put('/:idCart/products/:idProd', [isAuth], controller.updateProdQuantityToCart)
router.delete("/clear/:idCart", [isAuth], controller.clearCart);

export default router;