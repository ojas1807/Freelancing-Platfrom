import express from "express";
import FreelancerController from "../controllers/FreelancerController.js";

const router = express.Router();

// Routes
router.get("/", FreelancerController.getAllFreelancers);
router.post("/search", FreelancerController.searchFreelancers);
router.post("/", FreelancerController.addFreelancer);
router.patch("/:id/bookmark", FreelancerController.toggleBookmark);

export default router;