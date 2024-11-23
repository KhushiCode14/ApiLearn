import express from "express";
import userRouter from "./user/UserRouter";
import bookRouter from "./book/bookRouter";

// import globalErrorHandler from "./middlewares/globalErrorHandle";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
// http methods
app.get("/", (_req, res) => {
    // // throw new Error("somethign went wrong")
    // const error =createHttpError(400,"somethign went wrong")
    // throw error
    res.json({ message: "Welcome to my API!" });
});
//
// app.use(globalErrorHandler);
app.use("/api/users/", userRouter);
app.use("/api/books/", bookRouter);

export default app;
