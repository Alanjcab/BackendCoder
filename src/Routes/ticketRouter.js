import { Router } from 'express';
import ticketController from '../controllers/ticketController.js';
import { isAuth } from '../middlewares/isAuth.js';
const controller = new ticketController();

const router = Router();

router.post('/purchase', [isAuth], controller.generateTicket)

export default router;