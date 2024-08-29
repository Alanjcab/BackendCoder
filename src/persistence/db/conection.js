import mongoose from "mongoose";
import "dotenv/config";
import config from "../../config.js";
import {logger} from "../../utils/logger.js"

try {
    await mongoose.connect(config.MONGO_ATLAS_URL);
    logger.info("Conectado a la base de datos de MongoDB");
} catch (error) {
    logger.error("No se pudo conectar a la base de datos de MongoDB");
}