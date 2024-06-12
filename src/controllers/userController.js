import userDao from "../daos/mongoDb/userDao.js";
import { userModel } from "../daos/mongoDb/models/userModel.js";
const UserDao = new userDao(userModel);

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserDao.login(email, password);
        if (!user) res.status(404).json({ msg: "No estas autorizado." });
        else {
            req.session.email = email;
            req.session.password = password;
            res.redirect("/home")
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const adminUser = await UserDao.register({
                ...req.body,
                role: "admin",
            });
            if (!adminUser) {
                return res.status(401).json({ msg: "El usuario ya existe" });
            }
            return res.redirect("/login");
        }

        const user = await UserDao.register(req.body);
        if (!user) {
            return res.status(401).json({ msg: "El usuario ya existe" });
        }

        return res.redirect("/login");
    } catch (error) {
        console.error("Error durante el registro:", error);
        return res.status(500).json({ error: "Se produjo un error en el registro" });
    }
};
export const visit = (req, res) => {
    req.session.info && req.session.info.contador++;
    res.json({ msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces` })
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    })
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send('session destroy')
};