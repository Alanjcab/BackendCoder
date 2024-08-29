import { httpResponse } from "../utils/httpResponse.js";
const HttpResponse = new httpResponse(); 

export const errorHandler = (error, req, res, next)=>{
    console.log(`error: $(error.stack)`);
    const status = error.status || 500
    return HttpResponse.ServerError(res, error.message)    
}