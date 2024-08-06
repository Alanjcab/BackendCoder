import controllers from "./classController.js";
import userService from "../services/userServices.js";
import { httpResponse } from "../utils/httpResponse.js";

const HttpResponse = new httpResponse();
const UserService = new userService();

export default class userController extends controllers {
  constructor() {
    super(UserService);
  }

  register = async (req, res, next) => {
    try {
      const data = await UserService.register(req.body);
      if(!data) return HttpResponse.NotFound(res, data);
      else return HttpResponse.OK(res, data)
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
        return HttpResponse.NotFound(res, "Error de autenticacion")
      }
      const { first_name, last_name, email, age, role } = user;
      return HttpResponse.Ok( res, {first_name,last_name, email, age, role})
    } catch (error) {
      next(error);
    }
  };

  current =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      return HttpResponse.ok( res, user);
     } else return HttpResponse.Unauthorized(res, "Unauthorizer")
    } catch (error) {
      next(error);
    }
  };
}











