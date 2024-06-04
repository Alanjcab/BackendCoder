import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL

export const initMongoDb = async ()=>{
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL);
        console.log("conectado a la base de datos de MONGODB")
    }catch(error){
        console.log(error);}
}