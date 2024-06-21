import { Router } from "express";
import {registerResponse, loginResponse, githubResponse} from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/register", passport.authenticate('register'), registerResponse);

router.post("/login", passport.authenticate('login'), loginResponse);
router.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta PRIVADA' }))

router.get('/register-github', passport.authenticate('github', {scope: ['user: emial']}))

router.get('/home', passport.authenticate('github', {scope: ['user: emial']}), githubResponse);

export default router;