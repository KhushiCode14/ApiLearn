import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
// import createHttpError from "http-errors";
import User from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try {
        // Validation
        if (!email || !password || !name) {
            const error = createHttpError(400, "Fields are required");
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(error));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        const error = createHttpError(400, "User  already exists");
        return next(error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // Generate a token
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "2d",
        algorithm: "HS256",
    });

    // Respond with the token
    res.json({ accessToken: token });
};

export { createUser };
