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
      const existProd = await prodDao.getById(prodId);
      if (!existCart || !existProd) return null;
      const existProdInCart = await cartDao.existProdInCart(cartId, prodId);
      if (existProdInCart) {
        const quantity = existProdInCart.products.find(p => p.product.toString() === prodId).quantity + 1;
        return await cartDao.addProdToCart(cartId, prodId, quantity);
      }
      return await cartDao.addProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error)
    }
  };
  async removeProdToCart(cartId, prodId) {
    try {
      const existCart = await this.getById(cartId);
      const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
      if (!existCart || !existProd) return null;
      return await cartDao.removeProdToCart(cartId, prodId);

    } catch (error) {
      throw new Error(error)
    }
  };
  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await this.getById(cartId);
      const existProd = existCart.products.find(p => p.product._id.toString() === prodId);
      if (!existCart || !existProd) return null;
      return await cartDao.updateProdQuantityToCart(cartId, prodId, quantity)
    } catch (error) {
      throw new Error(error)
    }
  };
  async clearCart(cartId) {
    try {
      const existCart = await this.getById(cartId);
      if (!existCart) return null;
      return cartDao.clearCart(cartId);
    } catch (error) {
      throw new Error(error)
    }
  };
};













