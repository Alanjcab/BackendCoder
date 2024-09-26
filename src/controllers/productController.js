import controllers from "./classController.js";
import productService from "../services/productServices.js";
import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
import { userModel } from "../persistence/daos/mongoDb/models/userModel.js";
import { sendMail } from "../services/mailingServices.js";

const HttpResponse = new httpResponse();
const prodServices = new productService();

export default class productController extends controllers {
  constructor() {
    super(prodServices)
  }

  createProductM = async (req, res) => {
    try {
      const { cant } = req.query
      res.json(await prodServices.createProductMock(cant))
    } catch (error) {
      throw new Error(error);
    }
  }
  getProductsM = async (req, res) => {
    try {
      res.json(await prodServices.getProductsMock())
    } catch (error) {
      throw new Error(error);
    }
  }

  createProduct = async (req, res, next) => {
    try {
      const { email } = req.user;
      const productData = req.body;

      const newProduct = await prodServices.createProduct(productData, email);
    } catch (error) {
      logger.error('Error creating product', error);
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await prodServices.getById(id);
      if (!product) return HttpResponse.NotFound(res, "Producto no encontrado");
      if (product.owner && product.owner !== "admin") {
        const user = await userModel.findOne({ email: product.owner });
        if (user && user.role === "premium") {
          console.log("Usuario premium encontrado, enviando correo...");
          await sendMail(user, "productDeleted");
          console.log("Correo enviado al usuario premium.");
        } else {
          console.log("El usuario no es premium o no fue encontrado.");
        }
      } else {
        console.log("El producto no tiene un dueño válido para enviar un correo.");
      }

      const deletedProduct = await prodServices.delete(id);
      if (!deletedProduct) {
        return HttpResponse.NotFound(res, "Error eliminando el producto");
      }
      return HttpResponse.Ok(res, "Producto eliminado con éxito");
    } catch (error) {
      logger.error("Error eliminando producto", error);
      next(error);
    }
  };

}








