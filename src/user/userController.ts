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
        return next(console.log(error));
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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(
                createHttpError(400, "Email and password are required")
            );
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError(404, "User  not found"));
        }

        // Check the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(createHttpError(401, "Invalid password"));
        }

        // Generate a token
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "2d",
            algorithm: "HS256",
        });

        // Respond with the token
        res.json({ accessToken: token });
    } catch {
        return next(createHttpError(500, "Internal server error"));
    }
};
export { createUser, loginUser };
