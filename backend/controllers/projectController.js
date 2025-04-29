import { Project, Job } from "../models/ProjectManagement.js";
import User from "../models/User.js";


// Add to your ProjectManagement controller file
export const hireFreelancer = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { proposalId, startDate, milestones } = req.body;
    const { _id } = req.user;

    // 1. Verify the job exists and belongs to this client
    const job = await Job.findById(jobId);
    if (!job || job.client.toString() !== _id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you don't have permission"
      });
    }

    // 2. Find the proposal
    const proposal = job.proposals.id(proposalId);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found"
      });
    }

    // 3. Create a new project from this job
    const newProject = new Project({
      name: job.name,
      description: job.description,
      budget: proposal.bid,
      client: _id,
      freelancer: proposal.freelancer,
      deadline: new Date(startDate),
      status: "In Progress",
      milestones: milestones.map(m => ({
        name: m.name,
        amount: m.amount,
        dueDate: new Date(m.dueDate),
        status: "Pending"
      }))
    });

    // 4. Update job status and hired proposal
    job.status = "Closed";
    proposal.status = "Accepted";
    
    // 5. Save all changes
    await Promise.all([newProject.save(), job.save()]);

    // 6. Notify freelancer (you'd implement this separately)
    // await notifyFreelancer(proposal.freelancer, jobId);

    res.status(200).json({
      success: true,
      data: {
        project: newProject,
        job
      }
    });
  } catch (error) {
    console.error("Error hiring freelancer:", error);
    res.status(500).json({
      success: false,
      message: "Error hiring freelancer",
      error: error.message
    });
  }
};

// In your ProjectController.js
export const createProject = async (req, res) => {
  try {
    const { name, description, budget, deadline } = req.body;
    const { _id } = req.user; // Assuming you have user authentication

    const newProject = new Project({
      name,
      description,
      budget,
      deadline,
      client: _id, // Associate the project with the client
      status: "Open", // Initial status
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// In your projectController.js
export const getClientProjects = async (req, res) => {
  try {
    const { _id } = req.user;
    
    // Get projects where current user is the client
    const ongoingProjects = await Project.find({
      client: _id,
      status: { $in: ["New", "In Progress", "Resolved"] }
    }).populate("freelancer", "name email avatar");
    
    const completedProjects = await Project.find({
      client: _id,
      status: "Completed"
    }).populate("freelancer", "name email avatar");

    // Format response
    const formatProjects = (projects) => projects.map(project => ({
      id: project._id,
      name: project.name,
      description: project.description,
      freelancer: project.freelancer ? {
        id: project.freelancer._id,
        name: project.freelancer.name,
        email: project.freelancer.email,
        avatar: project.freelancer.avatar || '/placeholder-user.jpg'
      } : null,
      progress: project.progress,
      deadline: project.deadline,
      budget: project.budget,
      status: project.status,
      ...(project.completedDate && { completedDate: project.completedDate })
    }));

    res.status(200).json({
      success: true,
      data: {
        ongoingProjects: formatProjects(ongoingProjects),
        completedProjects: formatProjects(completedProjects)
      }
    });
  } catch (error) {
    console.error("Error fetching client projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching your projects",
      error: error.message
    });
  }
};

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
      budget: `₹${project.budget.toLocaleString()}`,
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
      budget: `₹${project.budget.toLocaleString()}`,
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
      client: _id
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
      project.status = "Completed";
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

// Rate Project
export const rateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { rating } = req.body;
    const { _id } = req.user;

    // Verify user is the assigned freelancer
    const project = await Project.findOne({
      _id: projectId,
      client: _id
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.status !== "Completed") {
      return res.status(400).json({ error: "Project must be completed to rate" });
    }
    if (project.rating) {
      return res.status(400).json({ error: "Project already rated" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    project.rating = rating;
    project.completedDate = new Date();
    project.status = "Completed"; // Ensure status is set to completed
    await project.save();

    res.status(200).json({ message: "Project rated successfully" });
  } catch (error) {
    console.error("Error rating project:", error);
    res.status(500).json({ error: error.message });
  }
};

// controllers/projectController.js
export const getMilestones = async (req, res) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  try {
    const project = await Project.findOne({
      _id: projectId,
      client: _id
    })
      .select('milestones');
    res.json(project.milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Milestone
export const addMilestone = async (req, res) => {
  const { projectId } = req.params;
  const { _id } = req.user;
  try {
    // Verify user is the assigned freelancer
    const project = await Project.findOne({
      _id: projectId,
      client: _id
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const milestone = {
      name: req.body.name,
      dueDate: req.body.dueDate,
      description: req.body.description || ""
    };

    project.milestones.push(milestone);
    await project.save();

    res.status(201).json(project.milestones.slice(-1)[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Toggle Milestone
export const toggleMilestone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const milestone = project.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }

    milestone.completed = !milestone.completed;
    milestone.completedDate = milestone.completed ? new Date() : undefined;
    await project.save();

    res.json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Milestone
export const deleteMilestone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.milestones.pull({ _id: req.params.milestoneId });
    await project.save();

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// getprojectfiles
export const getProjectFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
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
    
    res.status(200).json({
      success: true,
      data: project.files
    });
  } catch (error) {
    console.error("Error fetching project files:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching files",
      error: error.message
    });
  }
}

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
      budget: `₹${job.budget.min.toLocaleString()}-₹${job.budget.max.toLocaleString()}`,
      deadline: new Date(job.deadline).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      status: job.status,
      skills: job.skills.join(", "),
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