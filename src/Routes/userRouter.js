import { Router } from "express";
import userController from "../controllers/userController.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const controller = new userController();
const router = Router();

router.post("/register", passport.authenticate('register'), controller.register);
router.post("/login", passport.authenticate('login'), controller.login);
router.post("/current", [isAuth], controller.current);
router.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta PRIVADA' }));
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/home', passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/profile-github',
  passReqToCallback: true
}));
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) res.send(err);
    res.redirect('/login');
  });
});

export default router;