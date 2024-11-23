import express from "express";
import {
    createBook,
    getSingleBook,
    listBook,
    updateBook,
} from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";
const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }, //30mb 30*1024*1024
});
// routes
bookRouter.post(
    "/books",
    authenticate,
    upload.fields([{ name: "coverImage" }, { name: "file" }]),
    createBook
);

bookRouter.patch(
    "/books/:bookId",
    authenticate,
    upload.fields([{ name: "coverImage" }, { name: "file" }]),
    updateBook
);

bookRouter.get("/books", listBook);
bookRouter.get("/books/:bookId", getSingleBook);
export default bookRouter;
