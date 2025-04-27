import express from "express";
import FreelancerProfile from "../models/FreelancerProfile.js";

const router = express.Router();

// Fetch all freelancer profiles
router.get("/freelancers", async (req, res) => {
  try {
    const freelancers = await FreelancerProfile.find();
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch freelancers", error });
  }
});

// Fetch a single freelancer profile by ID
router.get("/freelancers/:id", async (req, res) => {
  try {
    const freelancer = await FreelancerProfile.findById(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch freelancer", error });
  }
});

export default router;