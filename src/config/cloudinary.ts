import cloudinary from "cloudinary";
import { config } from "./config";

cloudinary.v2.config({
    cloud_name: config.cloudinaryCloud,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: true,
});

export default cloudinary;
