import mongoDao from "./mongoDao.js";
import { userModel } from "./models/userModel.js";

export default class userDaoMongo extends mongoDao {
  constructor() {
    super(userModel);
  }
  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id) {
    try {
      return await this.model.findById(id).populate("cart");
    } catch (error) {
      throw new Error(error)
    }
  }
}





















