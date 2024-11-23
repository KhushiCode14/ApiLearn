import { Request, Response, NextFunction } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import Book from "./bookModel";
import fs from "node:fs";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre } = req.body;

    try {
        // Access uploaded files via multer
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        // Process cover image
        const coverImageMimeType = files.coverImage[0].mimetype
            .split("/")
            .at(-1);
        const coverImageFileName = files.coverImage[0].filename;
        const coverImagePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            coverImageFileName
        );

        // Upload cover image to Cloudinary
        const coverImageUploadResult = await cloudinary.v2.uploader.upload(
            coverImagePath,
            {
                folder: "books-cover",
                format: coverImageMimeType,
                filename_override: coverImageFileName,
            }
        );

        // Process book file (PDF)
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            bookFileName
        );

        // Upload book file to Cloudinary
        const bookFileUploadResult = await cloudinary.v2.uploader.upload(
            bookFilePath,
            {
                folder: "books-pdf",
                filename_override: bookFileName,
                resource_type: "raw", // For non-image files
                format: "pdf",
            }
        );
        console.log("Request body:", req.body);
        const newBook = await Book.create({
            title: title || "untitled book",
            author: "67403eb0e9db44e7dd22d8a4",
            genre,
            coverImage: coverImageUploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
        });
        // delte temporary file
        await fs.promises.unlink(coverImagePath);
        await fs.promises.unlink(bookFilePath);

        // Send response with uploaded results
        res.status(201).json({
            message: "Files uploaded successfully",
            coverImage: coverImageUploadResult,
            bookFile: bookFileUploadResult,
            book: newBook._id,
        });
    } catch (error) {
        return next(error);
    }
};

export { createBook };
