const httpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
  };

  const errorsDictionary = {
    NOT_FOUND: "Not found",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    INTERNAL_SERVER_ERROR: "Internal server error",
  };


export class httpResponse {
    Ok(res, data){
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "success",
            data
        })
    }
    NotFound(res, data){
        return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: errorsDictionary.NOT_FOUND,
            data
        })
    }
    Unauthorized(res, data){
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            message: errorsDictionary.UNAUTHORIZED,
            error: data,
        })
    }
    Forbidden(res, data){
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            message: errorsDictionary.FORBIDDEN,
            error: data,
        })
    }
    ServerError(res, data){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: errorsDictionary.INTERNAL_SERVER_ERROR,
            error: data,
        })
    }

}