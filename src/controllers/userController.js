import controllers from "./classController.js";
import userService from "../services/userServices.js";
import { createResponse } from "../utils.js";

const UserService = new userService();

export default class userController extends controllers {
  constructor() {
    super(UserService);
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      let id = null;
      if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
      const user = await this.service.getById(id);
      if (!user) {
        return res.status(401).json({ msg: 'Error de autenticacion' });
      }
      const { first_name, last_name, email, age, role } = user;
      res.json({
        msg: 'LOGIN OK!',
        user: {
          first_name,
          last_name,
          email,
          age,
          role,
        }
      });
    } catch (error) {
      next(error);
    }
  };

  current =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user)
     } else createResponse(res, 401, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

  async githubResponse(req, res, next) {
    try {
      const { first_name, last_name, email, role } = req.user;
      res.json({
        msg: 'LOGIN CON GITHUB OK!',
        user: {
          first_name,
          last_name,
          email,
          role
        }
      });
    } catch (error) {
      next(error);
    }
  }
}











