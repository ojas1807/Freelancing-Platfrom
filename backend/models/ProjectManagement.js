import mongoose from "mongoose";

// Project Schema
const ProjectSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    client: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    freelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    status: { 
      type: String, 
      enum: ["New", "In Progress", "Resolved", "Completed"], 
      default: "New" 
    },
    progress: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 100 
    },
    deadline: { 
      type: Date, 
      required: true 
    },
    budget: { 
      type: Number, 
      required: true 
    },
    completedDate: { 
      type: Date 
    },
    rating: { 
      type: Number,
      min: 0,
      max: 5 
    },
    files: [
      {
        name: String,
        path: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    milestones: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },
        dueDate: {
          type: Date,
          required: true
        },
        completed: {
          type: Boolean,
          default: false
        },
        completedDate: {
          type: Date
        },
        description: {
          type: String,
          trim: true
        }
      }
    ]
  },
  { timestamps: true }
);

// Job Schema (Available Jobs)
const JobSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    client: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    budget: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    deadline: { 
      type: Date, 
      required: true 
    },
    status: {
      type: String,
      enum: ["Open", "Assigned", "Completed", "Cancelled", "Closed"],
      default: "Open"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    skills: [String],
    proposals: [
      {
        freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: String,
        bid: Number,
        timeline: String,
        attachments: [String],
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending"
        },
        submittedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Create and export models
const Project = mongoose.model("Project", ProjectSchema);
const Job = mongoose.model("Job", JobSchema);

export { Project, Job };