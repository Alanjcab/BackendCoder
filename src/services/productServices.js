import ProductDaoMongoDb from "../daos/mongoDb/productDao.js";
const prodDao = new ProductDaoMongoDb();

//import {__dirname} from "../utils.js"
//import ProductDaoFs from "../daos/fileSystem/productDao.js";
//const prodDao = new ProductDaoFs(`${__dirname}/daos/fileSystem/productDao.js`);


export const getAll = async (page, limit, name, sort) => {
    try {
      return await prodDao.getAll(page, limit, name, sort);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getById = async (id) => {
    try {
      const prod = await prodDao.getById(id);
    if (!prod) return false;
    else return prod;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const create = async (obj) => {
    try {
      const newProd = await prodDao.create(obj);
    if (!newProd) return false;
    else return newProd;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const update = async (id, obj) => {
    try {
      const prodUpd = await prodDao.update(id, obj);
    if (!prodUpd) return false;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const remove = async (id) => {
    try {
      const prodDel = await prodDao.delete(id);
    if (!prodDel) return false;
    else return prodDel;
    } catch (error) {
      throw new Error(error);
    }
  };