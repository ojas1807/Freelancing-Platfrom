import express from 'express';
import { createPayment, getFreelancerPayments, getPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get all payments
router.get('/',protect, getPayments);

// Create a new payment
router.post('/',protect, createPayment);
router.get('/freelancer/:userId',protect,getFreelancerPayments);

export default router;