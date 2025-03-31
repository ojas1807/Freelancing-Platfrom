import mongoose from "mongoose";

const ClientProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    clientType: { 
      type: String, 
      enum: ["individual", "business", "agency"], 
      required: true 
    },

    companyInfo: {
      name: { 
        type: String, 
        required: function() { return this.clientType !== "individual" } 
      },
      website: { type: String },
      size: { 
        type: String, 
        enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
        required: function() { return this.clientType !== "individual" }
      },
      industry: { type: String },
      description: { type: String },
    },

    hiringSummary: { type: String },

    hiringScopeInfo: {
      projectType: { type: String },
      duration: { 
        type: String, 
        enum: ["Less than 1 week", "1-4 weeks", "1-3 months", "3-6 months", "6+ months", "Ongoing work"] 
      },
      expertise: { 
        type: String, 
        enum: ["Entry Level", "Intermediate", "Expert", "Specialist", "Varies by project"] 
      },
      teamSize: { 
        type: String, 
        enum: ["1 freelancer", "2-5 freelancers", "5+ freelancers", "Varies by project"] 
      },
    },

    budget: {
      range: { 
        type: String, 
        enum: ["$0-$500", "$500-$1,000", "$1,000-$5,000", "$5,000-$10,000", "$10,000+", "Varies by project"] 
      },
      paymentType: { 
        type: String, 
        enum: ["hourly", "fixed", "both"] 
      },
      workHours: { 
        type: String, 
        enum: ["Less than 10 hrs/week", "10-30 hrs/week", "30+ hrs/week", "Full time", "Varies by project"] 
      },
    },

    preferredSkills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const ClientProfile = mongoose.model("ClientProfile", ClientProfileSchema);
export default ClientProfile;