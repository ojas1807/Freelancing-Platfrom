// routes/userRoutes.js
import express from "express";
import { getUsers, getUserById, getFreelancers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes for users
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
// Get all freelancers
router.get('/freelancers',protect, getFreelancers);

export default router;