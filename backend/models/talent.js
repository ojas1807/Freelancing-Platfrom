import mongoose from 'mongoose';

const talentSchema = new mongoose.Schema({
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
  isBookmarked: { type: Boolean, required: true },
  profilePic: { type: String, required: true }
});

const Talent = mongoose.model('Talent', talentSchema);

export default Talent;