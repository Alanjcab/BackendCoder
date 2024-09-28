import {Router} from "express";
import productController from "../controllers/productController.js"
import {isAuth} from "../middlewares/isAuth.js"
import { checkRole } from "../middlewares/checkRole.js";

const controller = new productController();

const router = Router();

router.get('/',[isAuth], controller.getAll)
router.get('/:id',[isAuth], controller.getById)
router.post('/',[isAuth], controller.createProduct)
router.put('/:id',[isAuth, checkRole], controller.update)
router.delete('/:id',[isAuth], controller.delete)

export default router;

