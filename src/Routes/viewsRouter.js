import express from "express";
import ProductDaoFs from "../persistence/daos/fileSystem/productDao.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
const productDao = new ProductDaoFs("./src/persistence/daos/fileSystem/products.json");

router.get("/home", async (req, res) => {
  try {
    const products = await productDao.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error del servidor");
  }
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/profile-github", isAuth, (req, res) => {
  console.log("req.user", req.user);
  const user = req.user.toObject();
  console.log(user);
  res.render("home", { user });
});



export default router;
