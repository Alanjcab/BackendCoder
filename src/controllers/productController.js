import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, name, sort } = req.query;
    const response = await service.getAll(page, limit, name, sort);
    const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
    const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
    res.json({
      payload: response.docs,
      info: {
        count: response.totalDocs,
        totalPages: response.totalPages,
        nextLink: next,
        prevLink: prev,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage
      }
    });
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);
    if(!prod) res.status(404).json({msg: 'Producto no encontrado'});
    else res.json(prod);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if(!newProd) res.status(404).json({msg: 'Error al crear el producto'});
    else res.json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    if(!prodUpd) res.status(404).json({msg: 'Error al actualizar el producto'});
    else res.json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.remove(id);
    if(!prodDel) res.status(404).json({msg: 'Error al eliminar el producto'});
    else res.json(prodDel);
  } catch (error) {
    next(error.message);
  }
};