import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  // Shared fields
  social: {
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String }
  },
  // Freelancer specific fields
  freelancer: {
    skills: [String],
    hourlyRate: { type: Number },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
      }
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
      }
    ],
    portfolio: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
        link: { type: String }
      }
    ]
  },
  // Client specific fields
  client: {
    company: { type: String },
    industry: { type: String },
    employeesCount: { type: String },
    description: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);