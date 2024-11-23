import { Date } from "mongoose";
import { User } from "../user/userTypes";

export interface Book {
    id: number;
    title: string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
}
