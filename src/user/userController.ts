import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
// import createHttpError from "http-errors";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    // console.log("req Data", req.body);
    // return res.json({});
    const { name, email, password } = req.body;

    // validation
    // express validator
    if (!email || !password || !name) {
        const error = createHttpError(400, "field are required");
        return next(error);
    } else {
        res.json({ message: "User created" });
    }
};

export { createUser };
