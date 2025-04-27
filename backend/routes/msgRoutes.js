import express from "express";
import { getMsg, sendMsg } from "../controllers/msgcontroller.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

// Middleware to pass io instance to controllers
const passIo = (req, res, next) => {
  req.io = req.app.get("socketio");
  next();
};

router.route("/:chatId").get(protect, getMsg);
router.route("/").post(protect, upload.array('files'), passIo, sendMsg);

export default router;