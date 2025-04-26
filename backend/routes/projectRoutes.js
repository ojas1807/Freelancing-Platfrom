import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { 
  getFreelancerProjects,
  getProjectDetails,
  updateProjectProgress,
  addProjectMessage,
  uploadProjectFile,
  getAvailableJobs,
  getJobDetails,
  submitJobProposal,
  // createProject,
  hireFreelancer,
  getClientProjects,
  toggleMilestone,
  addMilestone,
  deleteMilestone,
  getMilestones,
  getProjectFiles,
  rateProject,
  
} from "../controllers/projectController.js";
import { Job } from "../models/ProjectManagement.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept common file types
  const allowedFileTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.zip'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    return cb(null, true);
  }
  
  cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, PNG, and ZIP are allowed.'));
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Project routes
router.get("/client/projects", protect, getClientProjects);
router.get("/freelancer/projects", protect, getFreelancerProjects);
router.get("/projects/:projectId", protect, getProjectDetails);
router.patch("/projects/:projectId/progress", protect, updateProjectProgress);
router.patch("/projects/:projectId/status", protect, rateProject);
router.post("/projects/:projectId/messages", protect, addProjectMessage);
router.post("/projects/:projectId/files", protect, upload.single('file'), uploadProjectFile);
router.get("/projects/:projectId/files", protect, getProjectFiles);
router.post('/projects/:projectId/milestones',protect, addMilestone);
router.get('/projects/:projectId/milestones', protect, getMilestones);
router.patch('/projects/:projectId/milestones/:milestoneId/toggle',protect, toggleMilestone);
router.delete('/projects/:projectId/milestones/:milestoneId', protect, deleteMilestone);

// Add this with your other routes (near the job routes section)
router.post("/jobs", protect, async (req, res) => {
  try {
    const { name, description, client, budget, deadline, skills } = req.body;
    
    // Validate required fields
    if (!name || !description || !client || !budget || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newJob = new Job({
      name,
      description,
      client: req.user._id,
      budget,
      deadline: new Date(deadline),
      skills,
      status: "Open",
      proposals: []
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      data: newJob
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message
    });
  }
}); 

// Job routes
router.get("/jobs", protect, getAvailableJobs);
router.get("/jobs/:jobId", protect, getJobDetails);
router.post("/jobs/:jobId/hire", protect,hireFreelancer);
router.post("/jobs/:jobId/proposals", protect, upload.array('attachments', 5), submitJobProposal);

export default router;