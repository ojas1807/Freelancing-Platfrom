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
  submitJobProposal
} from "../controllers/projectController.js";

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
router.get("/freelancer/projects", protect, getFreelancerProjects);
router.get("/projects/:projectId", protect, getProjectDetails);
router.put("/projects/:projectId/progress", protect, updateProjectProgress);
router.post("/projects/:projectId/messages", protect, addProjectMessage);
router.post("/projects/:projectId/files", protect, upload.single('file'), uploadProjectFile);

// Job routes
router.get("/jobs", protect, getAvailableJobs);
router.get("/jobs/:jobId", protect, getJobDetails);
router.post("/jobs/:jobId/proposals", protect, upload.array('attachments', 5), submitJobProposal);

export default router;