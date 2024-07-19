import {Router} from "express";
import * as controller from "../controllers/productController.js";

const router = Router();

router.route('/')
      .get(controller.getAll)
      .post(controller.create)
router.route('/id')
      .get(controller.getById)
      .put(controller.update)
      .delete(controller.remove)

export default router;

