import { Document } from "mongoose";
export interface User extends Document {
    name: string;
    email: string;
    password: string;
    // _id: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
