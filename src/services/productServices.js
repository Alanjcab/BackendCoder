import services from "./classService.js";
import productDaoMongo from "../persistence/daos/mongoDb/productDao.js";

const prodDao = new productDaoMongo();

export default class productService extends services {
  constructor() {
    super(prodDao)
  }
}














