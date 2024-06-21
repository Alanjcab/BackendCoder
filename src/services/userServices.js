import { userModel } from "../daos/mongoDb/models/userModel.js";
import userDao from "../daos/mongoDb/userDao.js";
import { createHash, isValidPassword } from "../utils.js";

const UserDao = new userDao(userModel);

export const getUserById = async (id) => {
    try {
        return await UserDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await UserDao.getByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await getUserByEmail(email);
        if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCoder123") {
                const newUser = await UserDao.register({
                    ...user,
                    password: createHash(password),
                    role: "admin",
                });
                return newUser;
            } else {
                const newUser = await UserDao.register({
                    ...user,
                    password: createHash(password),
                });
                return newUser;
            }
        } else return null;
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await getUserByEmail(email);
        if (!userExist) return null;
        const passValid = isValidPassword(password, userExist);
        if (!passValid) return null;
        return userExist;
    } catch (error) {
        throw new Error(error);
    }
};