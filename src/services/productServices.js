import services from "./classService.js";
import productDaoMongo from "../persistence/daos/mongoDb/productDao.js";
import { ProductModel } from "../persistence/daos/mongoDb/models/productModel.js";
import { generateProducts } from "../utils/mockProducts.js";

const prodDao = new productDaoMongo();

export default class productService extends services {
  constructor() {
    super(prodDao)
  }
  async createProductMock(cant = 100) {
    try {
      const productsArray = [];
      for (let i = 0; i < cant; i++) {
        const product = generateProducts();
        productsArray.push(product);
      }
      return await ProductModel.create(productsArray);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProductsMock() {
    try {
      return await ProductModel.find({})
    } catch (error) {
      throw new Error(error);
    }
  }
}














