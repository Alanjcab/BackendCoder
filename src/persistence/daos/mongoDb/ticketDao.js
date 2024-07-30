import mongoDao from "./mongoDao.js";
import { TicketModel } from "./models/ticketModel.js";

export default class ticketDaoMongo extends mongoDao {
    constructor() {
        super(TicketModel);
    }
};