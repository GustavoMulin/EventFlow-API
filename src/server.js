import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import db from "./config/db.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);


app.listen(3000, async () => {
    await db;
    console.log("Server online na porta 3000");
});