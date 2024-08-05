import controllers from "./classController.js";
import productService from "../services/productServices.js";

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
}








