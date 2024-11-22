// import { timeStamp } from "console";
import mongoose from "mongoose";
import { User } from "./userTypes";
// schema define
const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// model

const User = mongoose.model<User>("User", userSchema);

export default User;
