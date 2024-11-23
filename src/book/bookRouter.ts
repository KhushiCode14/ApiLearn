import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";
const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }, //30mb 30*1024*1024
});
// routes
bookRouter.post(
    "/books",
    upload.fields([{ name: "coverImage" }, { name: "file" }]),
    createBook
);

export default bookRouter;
