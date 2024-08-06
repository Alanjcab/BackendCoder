import controllers from "./classController.js";
import ticketService from "../services/ticketService.js";
import { httpResponse } from "../utils/httpResponse.js";

const HttpResponse = new httpResponse();
const TicketService = new ticketService();


export default class ticketController extends controllers {
  constructor() {
    super(TicketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await TicketService.generateTicket(user);
      if(!ticket) return HttpResponse.NotFound(res,'Error generat ticket' );
      else return HttpResponse.Ok(res, ticket);
    } catch (error) {
      next(error);
    }
  };
};