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

const login = async (req, email, password, done) => {
    try {
        const userLogin = await UserService.login({ email, password });
        if (!userLogin) {
            return done(null, false, { message: 'Credenciales incorrectas' });
        }
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};


const loginStrategy = new LocalStrategy(strategyConfig, login);


passport.use('login', loginStrategy);
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserDao.getById(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});


