import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

// Protected routes for messages
router.route("/:chatId").get(protect, getMessages); // Get messages for a chat
router.route("/").post(protect, upload.array('files'), sendMessage); // Send a new message

export default router;