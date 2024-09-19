import services from "./classService.js";
import userDaoMongo from "../persistence/daos/mongoDb/userDao.js";
import { createHash, hashBeenMoreThanXtime, isValidPassword } from "../utils/utils.js";
import userRepository from "../persistence/repository/userRepository.js";
import cartDaoMongo from "../persistence/daos/mongoDb/cartDao.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { sendMail } from "./mailingServices.js";

const CartDao = new cartDaoMongo();
const UserRepository = new userRepository();
const userDao = new userDaoMongo()
export default class userService extends services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  }


  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await CartDao.create();
        if (email === process.env.EMAIL_ADMIN && password === process.env.PASSWD_ADMIN) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          await sendMail(user, 'register')
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          await sendMail(user, 'register')
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      await this.updateLastConection(userExist._id);
      return userExist;
    } catch (error) {
      throw new Error(error);
    }
  }
  getUserById = async (id) => {
    try {
      return await UserRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async generateResetPass(user) {
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error)
    }
  }

  async updatePass(pass, user) {
    try {
      const isEqual = isValidPassword(pass, user);
      if (isEqual) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error)
    }
  }


  async updateLastConection(userId) {
    return await this.dao.update(userId, {
      last_conection: new Date(),
    })
  }

  async checkUserLastConection() {
    try {
      const usersInactive = [];
      const users = await this.dao.getAll();
      if (users.length > 0) {
        for (const user of users) {
          if (user.last_conection && hashBeenMoreThanXtime(user.last_conection)) {
            console.log(`paso mas de un minuto en su ultima conexion: ${user._id}`)
            await this.dao.update(user._id, {
              active: false
            })
            usersInactive.push(user.email);
          }
        }
      }
      return usersInactive;
    } catch (error) {
      throw new Error(error);
    }
  }
};







