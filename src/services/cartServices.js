import services from "./classService.js"
import cartDaoMongo from "../persistence/daos/mongoDb/cartDao.js";
import productDaoMongo from "../persistence/daos/mongoDb/productDao.js";

const prodDao = new productDaoMongo();
const cartDao = new cartDaoMongo();
export default class cartServices extends services {
  constructor() {
    super(cartDao)
  }
  async addProdToCart(cartId, prodId) {
    try {
      const existCart = await this.getById(cartId);
      if (!existCart) return null;
  
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;

      return await this.dao.addProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error)
    }
  };
  async removeProdToCart(cartId, prodId) {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
      return await this.dao.removeProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error)
    }
  };
  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
  
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
  
      return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      throw new Error(error)
    }
  };
  async clearCart(cartId) {
    try {
      const existCart = await this.getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return null;
      return await this.dao.clearCart(cartId);
    } catch (error) {
      throw new Error(error)
    }
  };
};













