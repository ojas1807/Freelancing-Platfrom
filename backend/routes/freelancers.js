import express from "express";
import FreelancerProfile from "../models/FreelancerProfile.js";

const router = express.Router();

// Fetch all freelancer profiles
router.get("/freelancers", async (req, res) => {
    try {
      const freelancers = await FreelancerProfile.find()
        .populate('userId', 'name email profilePic') // Add the fields you want from User model
        .exec();
      
      // Format the response for the frontend
      const formattedFreelancers = freelancers.map(freelancer => {
        return {
          ...freelancer.toObject(),
          name: freelancer.userId.name,
          email: freelancer.userId.email,
          profilePic: freelancer.userId.profilePic
        }
      });
      
      res.status(200).json(formattedFreelancers);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      res.status(500).json({ message: "Failed to fetch freelancers", error: error.message });
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