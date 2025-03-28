import express from 'express';
import authMiddleware, { roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/freelancer_dashboard', authMiddleware, roleMiddleware(['freelancer']), (req, res) => {
    res.json({ message: 'Welcome Freelancer Dashboard' });
});

export default router;
