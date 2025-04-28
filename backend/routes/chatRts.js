import express from "express";
import { getChats1, createChat1 } from "../controllers/chatctrl.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to pass io instance to controllers
const passIo = (req, res, next) => {
  req.io = req.app.get("socketio");
  next();
};

router.route("/").get(protect, getChats1).post(protect, passIo, createChat1);

export default router;