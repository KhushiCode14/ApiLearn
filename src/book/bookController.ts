import { Response, Request, NextFunction } from "express";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log("file", req.files);
    res.json({ message: "ok" });
};
export { createBook };
