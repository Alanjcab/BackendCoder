import controllers from "./classController.js";
import cartServices from "../services/cartServices.js";
import { httpResponse } from "../utils/httpResponse.js";

const HttpResponse = new httpResponse();
const CartServices = new cartServices();

export default class cartController extends controllers {
  constructor() {
    super(CartServices)
  }
  addProdToCart = async (req, res, next) => {
    try {
      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(cart, idProd, req.user);
      if (!newProdToUserCart) {
        return HttpResponse.NotFound(res, "Error adding product to cart");
      } else {
        return HttpResponse.Ok(res, newProdToUserCart);
      }
    } catch (error) {
      next(error.message);
    }
  };
  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) return HttpResponse.NotFound(res, "cart or prod not existant")
      else return HttpResponse.Ok(res, delProdToUserCart);
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
      if (!updateProdQuantity) return HttpResponse.NotFound(res, "cart or prod not existant")
      else return HttpResponse.Ok(res, updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };
  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) return HttpResponse.NotFound(res, "Error clear cart")
      else return HttpResponse.Ok(res, clearCart);
    } catch (error) {
      next(error.message);
    }
  };
}




