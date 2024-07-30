import controllers from "./classController.js";
import cartServices from "../services/cartServices.js";
import { createResponse } from "../utils.js";

const CartServices = new cartServices();

export default class cartController extends controllers {
  constructor() {
    super(CartServices)
  }
  addProdToCart = async(req, res, next) => {
  try {
    const { cart } = req.user;
    const { idProd } = req.params;
    const newProdToUserCart = await this.service.addProdToCart(cart, idProd);
    if (!newProdToUserCart) createResponse(res, 404, { msg: "Error no exist cart" });
    else createResponse(res, 200, newProdToUserCart);
  } catch (error) {
    next(error.message);
  }
};
  removeProdToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const delProdToUserCart = await this.service.removeProdToCart(idCart, idProd);
    if (!delProdToUserCart) createResponse(res, 404, { msg: "cart or prod not existant" });
    else createResponse(res, 200, { msg: `product ${idProd} deleted to cart` });
  } catch (error) {
    next(error.message);
  }
};
  updateProdQuantityToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProd } = req.params;
    const { quantity } = req.body;
    const updateProdQuantity = await this.service.updateProdQuantityToCart(
      idCart,
      idProd,
      quantity
    );
    if (!updateProdQuantity)
      createResponse(res, 404, { msg: "cart or prod not existant" });
    else createResponse(res, 200, updateProdQuantity);
  } catch (error) {
    next(error.message);
  }
};
  clearCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const clearCart = await this.service.clearCart(idCart);
    if (!clearCart) createResponse(res, 404, { msg: "Error clear cart" });
    else createResponse(res, 200, clearCart);
  } catch (error) {
    next(error.message);
  }
};
}




