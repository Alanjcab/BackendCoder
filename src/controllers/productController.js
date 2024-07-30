import controllers from "./classController.js";
import productService from "../services/productServices.js";

const prodServices = new productService();

export default class productController extends controllers{
  constructor(){
    super(prodServices)
  }
}








