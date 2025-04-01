import express from 'express';
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

// Get all jobs
router.get('/', getAllJobs);

// Get a job by ID
router.get('/:id', getJobById);

// Create a new job
router.post('/', createJob);

// Update a job
router.put('/:id', updateJob);

// Delete a job
router.delete('/:id', deleteJob);

export default router;