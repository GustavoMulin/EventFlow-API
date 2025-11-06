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
  deleteEvent,
  upload
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
router.post("/categories", authMiddleware, createCategory);
router.put("/categories/:id", authMiddleware, updateCategory);
router.delete("/categories/:id", authMiddleware, deleteCategory);

// Event routes
router.post("/events", authMiddleware, upload.single("image"), createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.put("/events/:id", upload.single("image"), updateEvent);
router.delete("/events/:id", authMiddleware, deleteEvent);

// Location routes
router.get("/locations", getAllLocations);
router.post("/locations", authMiddleware, createLocation);
router.put("/locations:id", authMiddleware, updateLocation);
router.delete("/locations:id", authMiddleware, deleteLocation);

export default router;