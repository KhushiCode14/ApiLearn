// global error handler --last of all routes
import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 404;
    return res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === "development" ? err.stack : "",
    });
};
export default globalErrorHandler;
