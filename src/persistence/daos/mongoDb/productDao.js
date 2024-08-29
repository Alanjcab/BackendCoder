import mongoDao from "./mongoDao.js";
import { ProductModel } from "./models/productModel.js";


export default class productDaoMongo extends mongoDao {
  constructor() {
    super(ProductModel);
  }
};




















