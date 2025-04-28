import Payment from '../models/Payment.js';

// Get all payments
export async function getPayments(req, res) {
  try {
    const payments = await Payment.find()
      .populate('client', 'name email')
      .populate('freelancer', 'name email');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new payment
export async function createPayment(req, res) {
  try {
    const { invoiceId, project, freelancer, date, amount, status, client } = req.body;
    
    const payment = new Payment({
      invoiceId,
      project,
      client,
      freelancer,
      date: new Date(date),
      amount: parseFloat(amount),
      status
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// paymentController.js
export async function getFreelancerPayments(req, res) {
    try {
        const payments = await Payment.find({ freelancer: req.params.userId })
            .populate('client', 'name email');
        res.json(payments);
    } catch (err) {
        res.status(500).json([]);
    }
}

