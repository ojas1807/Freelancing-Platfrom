// routes/clientProfileRoutes.js
import express from "express";
import {
  createClientProfile,
  getClientProfile,
  updateClientProfile
} from "../controllers/clientProfileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Client Profile
router.post("/", protect, createClientProfile);

// Get Client Profile by User ID
router.get("/:userId", protect, getClientProfile);

// Update Client Profile
router.put("/:userId", protect, updateClientProfile);



export default router;
