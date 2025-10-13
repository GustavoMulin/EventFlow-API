import express from "express";
import { register, login, listUsers } from "../controllers/AuthController.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/users", listUsers);

export default router;