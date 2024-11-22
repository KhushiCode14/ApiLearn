import express  from "express";
const app = express();
// routes
// http methods
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API!" });
});

export default app