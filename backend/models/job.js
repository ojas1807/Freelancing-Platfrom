import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  skills: { type: [String], required: true },
  budget: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  proposals: { type: Number, default: 0 },
  isBookmarked: { type: Boolean, default: false },
  rating: { type: Number, required: true },
  client: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    jobsPosted: { type: Number, required: true },
    memberSince: { type: Date, required: true },
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;