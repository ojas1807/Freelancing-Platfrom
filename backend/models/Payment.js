import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  invoiceId: { type: String, required: true },
  project: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  freelancer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default model('Payment', paymentSchema);