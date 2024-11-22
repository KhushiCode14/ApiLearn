import app from "./src/app";

const startServer = ()=>{
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}

startServer()