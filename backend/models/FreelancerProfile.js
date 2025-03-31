import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  
  title: { 
    type: String, 
    required: [true, "Job title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  company: { 
    type: String, 
    required: [true, "Company name is required"],
    trim: true,
    maxlength: [100, "Company name cannot exceed 100 characters"]
  },
  location: { 
    type: String, 
    trim: true,
    maxlength: [100, "Location cannot exceed 100 characters"]
  },
  currentlyWorking: { 
    type: Boolean, 
    default: false 
  },
  startDate: {
    month: { 
      type: String, 
      required: [true, "Start month is required"],
      enum: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    year: { 
      type: Number, 
      required: [true, "Start year is required"],
      min: [1970, "Year must be after 1970"],
      max: [new Date().getFullYear(), "Year cannot be in the future"]
    }
  },
  endDate: {
    month: { 
      type: String,
      enum: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      required: function() { return !this.currentlyWorking; }
    },
    year: { 
      type: Number,
      min: [1970, "Year must be after 1970"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
      required: function() { return !this.currentlyWorking; }
    }
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  }
}, { _id: false });

const FreelancerProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true
  },
  freelancerLevel: {
    type: String,
    required: [true, "Freelancer level is required"],
    enum: {
      values: ["beginner", "experienced", "expert"],
      message: "Freelancer level must be beginner, experienced, or expert"
    }
  },
  workExperience: {
    type: [ExperienceSchema],
    validate: {
      validator: function(v) {
        // Allow empty array or array with valid experiences
        return v.every(exp => 
          exp.title && exp.company && 
          exp.startDate.month && exp.startDate.year
        );
      },
      message: "Invalid work experience format"
    },
    default: []
  },
  profileTitle: {
    type: String,
    required: [true, "Profile title is required"],
    trim: true,
    maxlength: [100, "Profile title cannot exceed 100 characters"]
  },
  skills: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 15 && v.every(skill => skill.length <= 50);
      },
      message: "Maximum 15 skills allowed (50 chars each)"
    },
    default: []
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "Accounting & Consulting",
      "Admin Support",
      "Customer Service",
      "Data Science & Analytics",
      "Design & Creative",
      "Engineering & Architecture",
      "IT & Networking",
      "Legal",
      "Sales & Marketing",
      "Translation",
      "Web, Mobile & Software Dev",
      "Writing"
    ]
  },
  specialties: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 3;
      },
      message: "Select 1 to 3 specialties"
    },
    required: [true, "At least one specialty is required"]
  },
  completedSteps: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
FreelancerProfileSchema.index({ userId: 1 });
FreelancerProfileSchema.index({ category: 1 });
FreelancerProfileSchema.index({ skills: 1 });

// Virtual for formatted experience duration
FreelancerProfileSchema.virtual('formattedExperiences').get(function() {
  return this.workExperience.map(exp => ({
    ...exp.toObject(),
    duration: exp.currentlyWorking 
      ? `${exp.startDate.month}/${exp.startDate.year} - Present`
      : `${exp.startDate.month}/${exp.startDate.year} - ${exp.endDate.month}/${exp.endDate.year}`
  }));
});

const FreelancerProfile = mongoose.model("FreelancerProfile", FreelancerProfileSchema);
export default FreelancerProfile;