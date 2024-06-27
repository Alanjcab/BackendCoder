import passport from "passport";
import userDao from "../daos/mongoDb/userDao.js";
const  UserDao = new userDao();
import 'dotenv/config';

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await UserDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await UserDao.register({
    first_name: profile._json.name.split(' ')[0],
    last_name: profile._json.name.split(' ').length === 3 ? profile._json.name.split(' ')[1].concat(' ', profile._json.name.split(' ')[2]) : profile._json.name.split(' ')[1],
    email,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));