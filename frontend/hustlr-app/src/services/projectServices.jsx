import toast from "react-hot-toast";

const API_URL = 'http://localhost:5000/api/project';

export const ProjectServices = {

  

  // New method to get freelancer's projects
  getFreelancerProjects: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/freelancer/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw await parseError(response);
      
      const result = await response.json();
      
      // Format the response to match frontend expectations
      if (result.data) {
        return {
          ongoingProjects: result.data.ongoingProjects?.map(project => ({
            ...project,
            id: project._id || project.id,
            progress: project.progress || 0,
            deadline: project.deadline || new Date(),
            budget: project.budget || 0,
            status: project.status === "New" ? "New" : 
                   project.status === "Resolved" ? "Under Review" : "In Progress"
          })) || [],
          completedProjects: result.data.completedProjects?.map(project => ({
            ...project,
            id: project._id || project.id,
            completedDate: project.completedDate || project.updatedAt,
            budget: project.budget || 0,
            rating: project.rating || 0
          })) || []
        };
      }
      
      return { ongoingProjects: [], completedProjects: [] };
    } catch (error) {
      console.error('Error fetching freelancer projects:', error);
      throw new Error(error.message || 'Failed to fetch freelancer projects');
    }
  },

    // Get projects where client has hired freelancers
    getClientProjects: async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/client/projects`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) throw await parseError(response);
        
        const result = await response.json();
        
        // Format projects for display
        const formatProjects = (projects) => projects?.map(project => ({
          ...project,
          id: project._id || project.id,
          deadline: project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set',
          budget: project.budget ? `₹${project.budget.toLocaleString()}` : 'Not specified',
          completedDate: project.completedDate ? new Date(project.completedDate).toLocaleDateString() : undefined,
          freelancer: project.freelancer || null
        })) || [];
  
        return {
          ongoingProjects: formatProjects(result.data?.ongoingProjects),
          completedProjects: formatProjects(result.data?.completedProjects)
        };
      } catch (error) {
        console.error('Error fetching client projects:', error);
        throw new Error(error.message || 'Failed to load your projects');
      }
    },
  


  // Get projects with status filtering
  getProjects: async (statusFilter) => {
    const token = localStorage.getItem('token');
    
    try {
      const url = statusFilter 
        ? `${API_URL}/projects?status=${statusFilter}`
        : `${API_URL}/jobs/`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw await parseError(response);
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch projects');
    }
  },

  // Create new project
  createProject: async (projectData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to create project');
    }
  },

  // Update project progress (matches your schema)
  updateProgress: async (projectId, progress) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/progress`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress })
      });
      toast.success('Project progress updated successfully!');

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update progress');
    }
  },

  //update project status (matches your schema)
  updateProjectStatus: async (projectId, status, rating) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, rating })
      });
      toast.success('Project status updated successfully!');
      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update status');
    }
  },

  // rating project (matches your schema)
  rateProject: async (projectId, rating) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/rating`, {
        method: 'PATCH',
        headers
: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
      });
      toast.success('Project rating updated successfully!');
      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update rating');
    }
  },

  // Add message to project (matches messages subdocument)
  addMessage: async (projectId, content) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to add message');
    }
  },

  // File upload (matches files subdocument)
  uploadFile: async (projectId, file) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'File upload failed');
    }
  },

  // Get project files (matches files subdocument)
  getFiles: async (projectId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/files`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw await parseError(response);
      const result = await response.json();
      return result.data?.map(file => ({
        id: file._id || file.id,
        name: file.name || 'Unknown File',
        url: file.url || `${API_URL}/projects/${projectId}/files/${file._id}`,
        uploadedAt: file.createdAt || new Date().toISOString()
      })) || [];
    } catch (error) {
      console.error('Error fetching project files:', error);
      throw new Error(error.message || 'Failed to fetch project files');
    }
  },



  // services/projectServices.js
getMilestones: async (projectId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/projects/${projectId}/milestones`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw await parseError(response);
  return await response.json();
},

  // Add Milestone
  addMilestone: async (projectId, milestoneData) => {
    const token = localStorage.getItem('token');
    // Add validation
  if (!projectId) {
    throw new Error('Project ID is required');
  }
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/milestones`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(milestoneData)
      });

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      console.error('Error adding milestone:', error);
      throw new Error(error.message || 'Failed to add milestone');
    }
  },

  // Toggle Milestone Completion
  toggleMilestone: async (projectId, milestoneId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${API_URL}/projects/${projectId}/milestones/${milestoneId}/toggle`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      console.error('Error toggling milestone:', error);
      throw new Error(error.message || 'Failed to toggle milestone');
    }
  },

  // Delete Milestone
  deleteMilestone: async (projectId, milestoneId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${API_URL}/projects/${projectId}/milestones/${milestoneId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw await parseError(response);
      return true;
    } catch (error) {
      console.error('Error deleting milestone:', error);
      throw new Error(error.message || 'Failed to delete milestone');
    }
  }
};

// Job Services (matches your Job schema)
export const JobServices = {

  hireFreelancer: async (jobId, proposalId, hireData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}/hire`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          proposalId,
          ...hireData
        })
      });

      if (!response.ok) {
        const error = await parseError(response);
        console.error('Hiring error details:', error);
        throw error;
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error hiring freelancer:', error);
      throw new Error(error.message || 'Failed to hire freelancer');
    }
  },
  // Get available jobs (Open status)
  getAvailableJobs: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/jobs?status=Open`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw await parseError(response);
      
      const result = await response.json();
      
      // Debug logging
      console.log('API Response:', result);
      
      // Handle both response structures:
      // 1. If response has { data } property
      // 2. If response is the array directly
      return result.data?.map(job => ({
        ...job,
        skills: job.skills || [], // Default to empty array
        proposals: job.proposals || [], // Default to empty array
        createdAt: job.createdAt || new Date().toISOString() // Default to current date
      })) || [];
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error(error.message || 'Failed to fetch jobs');
    }
  },

  // Add this new method for creating jobs
  createJob: async (jobData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });
      
      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to create job');
    }
  },

  // Submit proposal (matches proposals subdocument)
  submitProposal: async (jobId, proposalData) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}/proposals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proposalData)
      });

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Proposal submission failed');
    }
  },

  // Get proposals for a specific job
  getJobProposals: async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw await parseError(response);
      
      const result = await response.json();
      
      // Format the response to match your controller's structure
      if (!result.data || !result.data.proposals) {
        return [];
      }

      // For each proposal, we need to fetch freelancer details
      const proposalsWithFreelancers = await Promise.all(
        result.data.proposals.map(async (proposal) => {
          // Fetch freelancer details if not already populated
          let freelancer = proposal.freelancer;
          if (typeof freelancer === 'string') {
            const freelancerResponse = await fetch(`${API_URL}/users/${freelancer}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (freelancerResponse.ok) {
              const freelancerData = await freelancerResponse.json();
              freelancer = freelancerData.data;
            }
          }

          return {
            id: proposal._id || proposal.id,
            freelancer: {
              id: freelancer?._id || freelancer?.id,
              name: freelancer?.name || 'Unknown Freelancer',
              avatar: freelancer?.avatar ? 
                `${API_URL}/users/${freelancer._id}/avatar` : 
                '/placeholder-user.jpg',
              title: freelancer?.title || 'Freelancer',
              rating: freelancer?.rating || 0,
            },
            bidAmount: proposal.bid || 0,
            estimatedTime: proposal.timeline || 'Not specified',
            message: proposal.message || 'No proposal message',
            submittedAt: proposal.createdAt || new Date().toISOString(),
            attachments: proposal.attachments || []
          };
        })
      );

      return proposalsWithFreelancers;
    } catch (error) {
      console.error('Error fetching job proposals:', error);
      throw new Error(error.message || 'Failed to fetch proposals');
    }
  }
};

// Helper function
async function parseError(response) {
  try {
    const error = await response.json();
    return new Error(error.message || response.statusText);
  } catch {
    return new Error(response.statusText || 'Request failed');
  }
}