import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import userService from "../services/userServices.js";
import userDaoMongo from "../persistence/daos/mongoDb/userDao.js";


const UserDao = new userDaoMongo();
const UserService = new userService();

const strategyConfig = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

const signUp = async (req, email, password, done) => {
  try {
    const user = await UserDao.getByEmail(email);
    if (user) return done(null, false);
    const newUser = await UserService.register(req.body);
    return done(null,newUser) ;
  } catch (error) {
    console.log(error);
    return done(null, false);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await UserService.login({ email, password });
    if (!userLogin) {
      req.session.destroy();
      return done(null, false, { message: 'credencial incorrecta' });
    }
    return done(null, userLogin);
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('register', signUpStrategy);
passport.use('login', loginStrategy);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserDao.getById(id);
    console.log("lo que llega al deserializeUser: ", user);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});


