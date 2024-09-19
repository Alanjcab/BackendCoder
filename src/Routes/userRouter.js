import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

const controller = new userController();
const router = Router();

router.post("/register", controller.register);
router.post("/login", passport.authenticate('login'), controller.login);
router.post("/current", [isAuth], controller.current);
router.post('/reset-pass', [isAuth], controller.generateResetPass);
router.put('/new-pass', [isAuth], controller.updatePass);
router.put("/", checkAdmin, controller.checkUsersLastConection)
router.get("/", [isAuth], checkAdmin, controller.getAllUsers)


export default router;