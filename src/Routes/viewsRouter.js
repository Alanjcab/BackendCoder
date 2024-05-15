import express from "express";
import ProductManager from "../app.js/productsManager.js";

const router = express.Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error del servidor");
  }
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default router;
