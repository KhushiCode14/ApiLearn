import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";
const PORT = config.port || 3000
const startServer = async()=>{
    // connnect db
    await connectDB()
    app.listen(PORT , () => {
        console.log(`Server started on port 3000 or ${PORT}`);
    });
}

startServer()