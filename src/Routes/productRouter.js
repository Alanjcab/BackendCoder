import {Router} from "express";
import productController from "../controllers/productController.js"
import {checkAdmin} from "../middlewares/checkAdmin.js"
import {isAuth} from "../middlewares/isAuth.js"

const controller = new productController();

const router = Router();

router.get('/',[isAuth], controller.getAll)
router.get('/:id',[isAuth], controller.getById)
router.post('/',[isAuth, checkAdmin], controller.create)
router.put('/:id',[isAuth, checkAdmin], controller.update)
router.delete('/:id',[isAuth, checkAdmin], controller.delete)

export default router;

