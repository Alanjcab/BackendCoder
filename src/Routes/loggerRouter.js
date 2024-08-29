import {Router} from "express";
import { logger } from "../utils/logger.js";

const router = Router();

router.get('/', (req, res) => {
    try {
        logger.debug('Log debug');
        logger.info('Log info');
        logger.warn('Log warning');
        logger.error('Log error');
        logger.fatal('Log fatal');
        res.json({ message: "Se imprimen los logs por consola "})
    } catch (error) {
        logger.error("Error logs:", error);
        throw new Error(error)
    }
});

export default router;