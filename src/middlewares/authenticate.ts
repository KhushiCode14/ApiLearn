import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import createHttpError from "http-errors";
export interface authRequest extends Request {
    userId: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).send({ message: "Access denied. No" });
    }

    const parseToken = token.split(" ")[1];
    try {
        const decode = verify(parseToken, config.jwtSecret as string);
        console.log("decode", decode);
        const _req = req as authRequest;
        _req.userId = decode.sub as string;
        next();
    } catch {
        return next(createHttpError(401, "token expire"));
    }
};
export default authenticate;
