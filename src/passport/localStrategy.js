import * as services from '../services/userServices.js';
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email);
        if(user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const userLogin = await services.login({ email, password });
        if(!userLogin){
            req.session.destroy()
            return done(null, false, { message: 'credencial incorrecta' });
        } 
        return done(null, userLogin)
    } catch (error) {
        console.log(error)
        return done(error)
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
        const user = await services.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});