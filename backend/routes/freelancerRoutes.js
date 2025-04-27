import express from 'express';
import { 
  createProfile,
  getMyProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
  updateProfileStep,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  searchProfiles
} from '../controllers/freelancerProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/', protect, createProfile);
router.get('/me', protect, getMyProfile);
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteProfile);
router.put('/step/:stepNumber', protect, updateProfileStep);

// Work experience routes
router.post('/experience', protect, addWorkExperience);
router.put('/experience/:experienceId', protect, updateWorkExperience);
router.delete('/experience/:experienceId', protect, deleteWorkExperience);

// Public routes
router.get('/search', searchProfiles);
router.get('/:userId', getProfileById);

export default router;