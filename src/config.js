import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    PORT: process.env.PORT,
};
