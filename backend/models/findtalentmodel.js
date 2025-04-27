import mongoose from 'mongoose';

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
  rate: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true },
  rating: { type: Number, required: true },
  projects: { type: Number, required: true },
  isBookmarked: { type: Boolean, default: false },
  profilePic: { type: String, required: true },
}, { timestamps: true });

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

export default Freelancer;