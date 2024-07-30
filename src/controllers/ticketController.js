import controllers from "./classController.js";
import ticketService from "../services/ticketService.js";
import { createResponse } from "../utils.js";
const TicketService = new ticketService();

export default class ticketController extends controllers {
  constructor() {
    super(TicketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.user;
      const ticket = await TicketService.generateTicket(user);
      if(!ticket) createResponse(res, 404, 'Error generat ticket');
      else createResponse(res, 200, ticket);
    } catch (error) {
      next(error);
    }
  };
};