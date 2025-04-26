import express from "express";
import { getChats, createChat } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes for chat
router.route("/").get(protect, getChats).post(protect, createChat);

export default router;