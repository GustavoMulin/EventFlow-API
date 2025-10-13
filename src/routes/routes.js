import express from "express";
import { register, login, listUsers } from "../controllers/AuthController.js";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/EventController.js";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/users", listUsers);

// Event routes
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Category routes
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;