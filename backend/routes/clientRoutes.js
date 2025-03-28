import express from 'express';
import authMiddleware, { roleMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/Client_dashboard', authMiddleware, roleMiddleware(['client']), (req, res) => {
    res.json({ message: 'Welcome Client Dashboard' });
});

export default router;
