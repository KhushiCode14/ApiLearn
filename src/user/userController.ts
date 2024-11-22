import { Response, Request, NextFunction } from "express";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "User created" });
};

export { createUser };
