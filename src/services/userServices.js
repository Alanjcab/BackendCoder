import services from "./classService.js";
import userDaoMongo from "../persistence/daos/mongoDb/userDao.js";
import { createHash, isValidPassword } from "../utils.js";
import userRepository from "../persistence/repository/userRepository.js";
import cartDaoMongo from "../persistence/daos/mongoDb/cartDao.js";

const CartDao = new cartDaoMongo();
const UserRepository = new userRepository();
const userDao = new userDaoMongo()
export default class userService extends services {
    constructor() {
        super(userDao);
    }
    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.dao.getByEmail(email);
            if (!existUser) {
              const cartUser = await CartDao.create();
                if (email === process.env.EMAIL_ADMIN && password === process.env.PASS_ADMIN) {
                  const newUser = await this.dao.create({
                    ...user,
                    password: createHash(password),
                    role: "admin",
                    cart: cartUser._id,
                  });
                  return newUser;
                } else {
                  const newUser = await this.dao.create({
                    ...user,
                    password: createHash(password),
                    cart: cartUser._id,
                  });
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
};







