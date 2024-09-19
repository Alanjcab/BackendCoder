import controllers from "./classController.js";
import userService from "../services/userServices.js";
import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
import { sendMail } from "../services/mailingServices.js";

const HttpResponse = new httpResponse();
const UserService = new userService();

export default class userController extends controllers {
  constructor() {
    super(UserService);
  }

  register = async (req, res, next) => {
    try {
      const data = await UserService.register(req.body);
      if (!data) return HttpResponse.NotFound(res, data);
      else {
        logger.info('Register user OK');
        return HttpResponse.Ok(res, data)
      }
    } catch (error) {
      logger.error('Error registering user');
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      let id = null;
      if (req.session.passport && req.session.passport.user) id = req.session.passport.user;
      const user = await this.service.getById(id);
      if (!user) {
        logger.error('Error en el login');
        return HttpResponse.NotFound(res, data)
      }
      const { first_name, last_name, email, age, role } = user;
      logger.info('Login ok');
      return HttpResponse.Ok(res, { first_name, last_name, email, age, role })
    } catch (error) {
      next(error);
    }
  };

  current = async (req, res, next) => {
    try {
      if (req.user) {
        const { _id } = req.user;
        const user = await this.service.getUserById(_id);
        return HttpResponse.Ok(res, user);
      } else return HttpResponse.Unauthorized(res, data)
    } catch (error) {
      next(error);
    }
  };

  generateResetPass = async (req, res, next) => {
    try {
      const user = req.user;
      const token = await this.service.generateResetPass(user);
      if (token) {
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token);
        HttpResponse.Ok(res, 200, 'Email reset pass send OK')
      } else HttpResponse.Unauthorized(res, 404, 'error email reset pass send')
    } catch (error) {
      next(error)
    }
  }

  updatePass = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return HttpResponse.Unauthorized(res, 401, 'User not authenticated');
      const { pass } = req.body;
      if (!pass || pass.trim() === '') {
        return HttpResponse.BadRequest(res, 400, 'Password is required');
      }
      const { tokenpass } = req.cookies;
      if (!tokenpass) return HttpResponse.Unauthorized(res, 401, 'Unhautorized');
      const updPass = await this.service.updatePass(pass, user);
      if (!updPass) return HttpResponse.Unauthorized(res, 404, 'cannot be the same')
      res.clearCookie('tokenpass');
      return HttpResponse.Ok(res, 200, updPass);
    } catch (error) {
      next(error)
    }
  }

  checkUsersLastConection = async (req, res, next) => {
    try {
      const response = await this.service.checkUsersLastConection();
      return HttpResponse.Ok(response)
    } catch (error) {
      next(error);
    }
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      return HttpResponse.Ok(res, users);
    } catch (error) {
      next(error);
    }
  };
}











