// import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { User } from "./userTypes";
// schema define
const userSchema = new Schema<User>(
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
    },
    { timestamps: true }
);

// model

const User = mongoose.model<User>("User", userSchema);

export default User;
