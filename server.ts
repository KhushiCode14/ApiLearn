import app from "./src/app";
import { config } from "./src/config/config";
const PORT = config.port || 3000
const startServer = ()=>{
    app.listen(PORT , () => {
        console.log(`Server started on port 3000 or ${PORT}`);
    });
}

startServer()