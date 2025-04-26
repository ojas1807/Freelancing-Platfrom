const API_URL = 'http://localhost:5000/api/project';

export const ProjectServices = {
  // Get projects with status filtering
  getProjects: async (statusFilter) => {
    const token = localStorage.getItem('token');
    
    try {
      const url = statusFilter 
        ? `${API_URL}/projects?status=${statusFilter}`
        : `${API_URL}/projects`;
      
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

      if (!response.ok) throw await parseError(response);
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to update progress');
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
  }
};

// Job Services (matches your Job schema)
export const JobServices = {
  // Get available jobs (Open status)
  getAvailableJobs: async () => {
    try {
      const response = await fetch(`${API_URL}/jobs?status=Open`);
      if (!response.ok) throw await parseError(response);
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch jobs');
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