// routes/userRoutes.js
import express from "express";
import { getUsers, getUserById } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes for users
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);

export default router;