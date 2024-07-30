import userDaoMongo from '../daos/mongoDb/userDao.js';
import userDTO from '../dtos/userDto.js';
const userDao = new userDaoMongo();

export default class userRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUserById(id) {
        try {
          const user = await this.dao.getUserById(id);
          return new userDTO(user);
        } catch (error) {
          throw new Error(error);
        }
    };
}