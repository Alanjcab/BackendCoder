import controllers from "./classController.js";
import userService from "../services/userServices.js";
import { createResponse } from "../utils.js";
import passport from "passport";

const UserService = new userService();

export default class userController extends controllers {
  constructor() {
    super(UserService);
  }

  register = async (req, res, next) => {
    try {
      const data = await UserService.register(req.body);
      data ? createResponse(res, 201, data) : createResponse(res, 400, data);
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
        msg: 'LOGIN OK',
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
}











