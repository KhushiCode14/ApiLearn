import express from "express";

// import globalErrorHandler from "./middlewares/globalErrorHandle";
const app = express();
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

export default app;
