import express from 'express';
import {
  getFreelancers,
  addFreelancer,
  toggleBookmark,
  deleteFreelancer,
} from '../controllers/findtalentcontroller.js';

const router = express.Router();

// Routes
router.get('/', getFreelancers); // Get all freelancers with filters
router.post('/', addFreelancer); // Add a new freelancer
router.patch('/:id/bookmark', toggleBookmark); // Toggle bookmark for a freelancer
router.delete('/:id', deleteFreelancer); // Delete a freelancer

export default router;