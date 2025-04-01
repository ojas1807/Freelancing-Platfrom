import express from 'express';
import { getAllTalents, createTalent, getTalent, updateTalent, deleteTalent } from '../controllers/talentController.js';

const router = express.Router();

// Get all talents
router.get('/', getAllTalents);

// Create a new talent
router.post('/', createTalent);

// Get a single talent
router.get('/:id', getTalent);

// Update a talent
router.put('/:id', updateTalent);

// Delete a talent
router.delete('/:id', deleteTalent);

export default router;