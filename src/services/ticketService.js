import services from "./classService.js";
import cartServices from "./cartServices.js";
import productService from "./productServices.js";
import ticketDaoMongo from "../persistence/daos/mongoDb/ticketDao.js";
import { v4 as uuidv4 } from "uuid";

const TicketDao = new ticketDaoMongo();
const ProdService = new productService();
const CartService = new cartServices();

export default class TicketService extends services {
    constructor() {
        super(TicketDao);
    }

    async generateTicket(user) {
        try {
            const cart = await CartService.getById(user.cart);
            if (!cart) return null;
            let amountAcc = 0;
            if (cart.products.length > 0) {
                for (const prodInCart of cart.products) {
                    const idProd = prodInCart.product;
                    const prodDB = await ProdService.getById(idProd);
                    if (prodInCart.quantity <= prodDB.stock) {
                        const amount = prodInCart.quantity * prodDB.price;
                        amountAcc += amount;
                    } else return null;
                }
            };
            const ticket = await this.dao.create({
                Code: uuidv4(),
                Purchase_datetime: new Date().toLocaleString(),
                Amount: amountAcc,
                Purchaser: user.email,
            });
            await CartService.clearCart(user.cart);
            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }
}