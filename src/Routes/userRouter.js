import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const controller = new userController();
const router = Router();

router.post("/register",controller.register);
router.post("/login", passport.authenticate('login'), controller.login);
router.post("/current", [isAuth], controller.current);


export default router;