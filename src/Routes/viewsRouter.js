import express from "express";
import ProductDaoFs from "../daos/fileSystem/productDao.js";

const router = express.Router();
const productDao = new ProductDaoFs("./src/daos/fileSystem/products.json");

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



export default router;
