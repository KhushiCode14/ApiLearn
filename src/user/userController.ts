import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
// import createHttpError from "http-errors";
import User from "./userModel";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
    // database call
    const user = await User.findOne({ email: email });
    if (user) {
        const error = createHttpError(400, "User already exists");
        return next(error);
    }
    //process and logic
    //response
};

export { createUser };
