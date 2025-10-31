import express from "express";
import { register, login, getProfile } from "../controllers/AuthController.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";

import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/EventController.js";


import {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation
} from "../controllers/LocationController.js";

const router = express.Router();

// Auth routes
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/profile", authMiddleware, getProfile);

// Category routes
router.get("/categories", getAllCategories);

// Protected Category routes
router.post("/categories", authMiddleware, createCategory);
router.put("/categories:id", authMiddleware, updateCategory);
router.delete("/categories:id", authMiddleware, deleteCategory);

// Event routes
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);

// Protected Event routes
router.post("/events", authMiddleware, createEvent);
router.put("/events/:id", authMiddleware, updateEvent);
router.delete("/events/:id", authMiddleware, deleteEvent);

// Location routes
router.get("/locations", getAllLocations);

// Protected Location routes
router.post("/locations", authMiddleware, createLocation);
router.put("/locations:id", authMiddleware, updateLocation);
router.delete("/locations:id", authMiddleware, deleteLocation);

export default router;