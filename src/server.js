import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(3000, async () => {
    await db;
    console.log("Server online na porta 3000");
});