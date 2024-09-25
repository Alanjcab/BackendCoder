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
  

  async updateProduct(id, productData, user) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) throw new Error('Product not found');

      if (user.role === 'premium' && product.owner !== user.email) {
        throw new Error('Permission denied: you can only modify your own products');
      }

      return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id, user) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) throw new Error('Product not found');

      if (user.role === 'premium' && product.owner !== user.email) {
        throw new Error('Permission denied: you can only delete your own products');
      }

      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

}














