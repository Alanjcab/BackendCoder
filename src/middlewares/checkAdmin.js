import { httpResponse } from "../utils/httpResponse.js";
const HttpResponse = new httpResponse();

export const checkAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") return HttpResponse.Unauthorized(res,"Autorizado para usuarios administradores" )
    else next();
  } catch (error) {
    next(error);
  }
};