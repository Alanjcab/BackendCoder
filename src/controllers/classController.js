import { httpResponse } from "../utils/httpResponse.js";
const HttpResponse = new httpResponse();


export default class controllers {
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const data = await this.service.getAll();
            return HttpResponse.Ok(res, data);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await this.service.getById(id);
            if (!data) return HttpResponse.NotFound(res, data);
            else return HttpResponse.Ok(res, data);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const data = await this.service.create(req.body);
            return HttpResponse.Ok(res, data);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await this.service.update(id, req.body);
            if (!data) return HttpResponse.NotFound(res, data);
            else return HttpResponse.Ok(res, data);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await this.service.delete(id);
            if (!data) return HttpResponse.NotFound(res, data);
            else return HttpResponse.Ok(res, data);
        } catch (error) {
            next(error);
        }
    };
}