import { Project, Job } from "../models/ProjectManagement.js";
import User from "../models/User.js";

// Project Controllers (for ongoing and completed projects)
export const getFreelancerProjects = async (req, res) => {
  try {
    const { _id } = req.user;
    
    // Get ongoing and completed projects for the freelancer
    const ongoingProjects = await Project.find({
      freelancer: _id,
      status: { $in: ["New", "In Progress", "Resolved"] }
    }).populate("client", "name email");
    
    const completedProjects = await Project.find({
      freelancer: _id,
      status: "Completed"
    }).populate("client", "name email");
    
    // Format projects for frontend
    const formattedOngoing = ongoingProjects.map(project => ({
      id: project._id,
      name: project.name,
      description: project.description,
      client: project.client.name,
      avatar: `/api/users/${project.client._id}/avatar`,
      progress: project.progress,
      deadline: new Date(project.deadline).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      budget: `$${project.budget.toLocaleString()}`,
      status: project.status === "New" ? "New" : 
              project.status === "Resolved" ? "Under Review" : "In Progress"
    }));
    
    const formattedCompleted = completedProjects.map(project => ({
      id: project._id,
      name: project.name,
      description: project.description,
      client: project.client.name,
      avatar: `/api/users/${project.client._id}/avatar`,
      completedDate: new Date(project.completedDate || project.updatedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      budget: `$${project.budget.toLocaleString()}`,
      rating: project.rating || 0
    }));
    
    res.status(200).json({
      success: true,
      data: {
        ongoingProjects: formattedOngoing,
        completedProjects: formattedCompleted
      }
    });
  } catch (error) {
    console.error("Error fetching freelancer projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message
    });
  }
};

export const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { _id } = req.user;
    
    const project = await Project.findOne({
      _id: projectId,
      $or: [{ freelancer: _id }, { client: _id }]
    })
    .populate("client", "name email")
    .populate("freelancer", "name email")
    .populate("messages.sender", "name role");
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have access"
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project details",
      error: error.message
    });
  }
};

export const updateProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { progress } = req.body;
    const { _id } = req.user;
    
    // Verify user is the assigned freelancer
    const project = await Project.findOne({
      _id: projectId,
      freelancer: _id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have permission to update it"
      });
    }
    
    // Update progress
    project.progress = progress;
    if (progress === 100) {
      project.status = "Resolved";
    }
    
    await project.save();
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("Error updating project progress:", error);
    res.status(500).json({
      success: false,
      message: "Error updating project progress",
      error: error.message
    });
  }
};

export const addProjectMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { content } = req.body;
    const { _id } = req.user;
    
    // Verify user is either the client or freelancer
    const project = await Project.findOne({
      _id: projectId,
      $or: [{ freelancer: _id }, { client: _id }]
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have access"
      });
    }
    
    // Add message
    project.messages.push({
      sender: _id,
      content
    });
    
    await project.save();
    
    // Populate sender info for the new message
    const updatedProject = await Project.findById(projectId)
      .populate("messages.sender", "name role");
    
    const newMessage = updatedProject.messages[updatedProject.messages.length - 1];
    
    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error("Error adding project message:", error);
    res.status(500).json({
      success: false,
      message: "Error adding message",
      error: error.message
    });
  }
};

export const uploadProjectFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { _id } = req.user;
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }
    
    // Verify user is either the client or freelancer
    const project = await Project.findOne({
      _id: projectId,
      $or: [{ freelancer: _id }, { client: _id }]
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you don't have access"
      });
    }
    
    // Add file to project
    project.files.push({
      name: req.file.originalname,
      path: req.file.path
    });
    
    await project.save();
    
    res.status(201).json({
      success: true,
      data: {
        name: req.file.originalname,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error("Error uploading project file:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message
    });
  }
};

// Job Controllers (available jobs)
export const getAvailableJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Open" })
      .populate("client", "name email")
      .sort({ createdAt: -1 });
    
    // Format jobs for frontend
    const formattedJobs = jobs.map(job => ({
      id: job._id,
      name: job.name,
      description: job.description,
      proposals: job.proposals.length,
      budget: `$${job.budget.min.toLocaleString()}-$${job.budget.max.toLocaleString()}`,
      deadline: new Date(job.deadline).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      posted: formatTimeAgo(job.createdAt),
      client: job.client.name,
      avatar: `/api/users/${job.client._id}/avatar`
    }));
    
    res.status(200).json({
      success: true,
      data: formattedJobs
    });
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching available jobs",
      error: error.message
    });
  }
};

export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await Job.findById(jobId)
      .populate("client", "name email")
      .populate("proposals.freelancer", "name email");
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }
    
    // Check if the freelancer has already submitted a proposal
    let hasApplied = false;
    let userProposal = null;
    
    if (req.user && req.user.role === "freelancer") {
      const proposal = job.proposals.find(
        p => p.freelancer._id.toString() === req.user._id.toString()
      );
      
      if (proposal) {
        hasApplied = true;
        userProposal = proposal;
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        ...job.toObject(),
        hasApplied,
        userProposal
      }
    });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job details",
      error: error.message
    });
  }
};

export const submitJobProposal = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { message, bid, timeline } = req.body;
    const { _id } = req.user;
    
    // Verify user is a freelancer
    const user = await User.findById(_id);
    if (user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can submit proposals"
      });
    }
    
    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }
    
    // Check if already applied
    const alreadyApplied = job.proposals.some(
      p => p.freelancer.toString() === _id.toString()
    );
    
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a proposal for this job"
      });
    }
    
    // Add proposal
    const attachments = req.files ? req.files.map(file => file.path) : [];
    
    job.proposals.push({
      freelancer: _id,
      message,
      bid: parseFloat(bid),
      timeline,
      attachments
    });
    
    await job.save();
    
    res.status(201).json({
      success: true,
      message: "Proposal submitted successfully"
    });
  } catch (error) {
    console.error("Error submitting job proposal:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting proposal",
      error: error.message
    });
  }
};

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000); // Difference in seconds
  
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`;
  
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}