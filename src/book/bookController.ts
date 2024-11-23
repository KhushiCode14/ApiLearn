import { Response, Request, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("file", req.files);
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        const coverImageMimeType = files.coverImage[0].mimetype
            .split("/")
            .at(-1);
        const fileName = files.coverImage[0].filename;
        const filepath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            fileName
        );
        const uploadResult = await cloudinary.v2.uploader.upload(filepath, {
            folder: "books-cover",
            // public_id: `book-${Date.now()}`,
            // width: 200,
            // height: 300,
            // crop: "scale",
            format: coverImageMimeType,
            filename_override: fileName,
        });

        const bookfileName = files.file[0].filename;
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads",
            bookfileName
        );
        const bookFileuploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                folder: "books-pdf",
                filename_override: bookfileName,
                resource_type: "raw",
                format: "pdf",
            }
        );
        console.log("bookFileuploadResult", bookFileuploadResult);
        console.log(uploadResult);
        res.json({ message: "ok" });
    } catch (error) {
        // console.log(error);
        return next(error);
    }
};
export { createBook };
