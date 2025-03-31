import axios from 'axios';

const API_URL = 'http://localhost:5000/api/freelancer-profile';

// Create a new freelancer profile


export const createProfile = async (token, profileData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create profile');
  }
  
  return data;
};

// get my profile data
export const getMyProfile = async (token) => {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile');
        }
        return data;
    };


export const getProfileById = async (token, userId) => {
  console.log("Sending Token:", token);
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

// Update profile
export const updateProfile = async (token, userId, profileData) => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  return response.json();
};


// Delete profile
export const deleteProfile = async () => {
  try {
    const response = await axios.delete(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Update specific step of profile setup
export const updateProfileStep = async (stepNumber, stepData) => {
  try {
    const response = await axios.put(`${API_URL}/step/${stepNumber}`, stepData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Add work experience
export const addWorkExperience = async (experienceData) => {
  try {
    const response = await axios.post(`${API_URL}/experience`, experienceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Update work experience
export const updateWorkExperience = async (experienceId, experienceData) => {
  try {
    const response = await axios.put(`${API_URL}/experience/${experienceId}`, experienceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Delete work experience
export const deleteWorkExperience = async (experienceId) => {
  try {
    const response = await axios.delete(`${API_URL}/experience/${experienceId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Search profiles
export const searchProfiles = async (searchParams) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Get categories and specialties for dropdowns
export const getCategories = () => {
  return [
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
  ];
};

// Get specialties based on selected category
export const getSpecialties = (category) => {
  const specialtiesMap = {
    "Accounting & Consulting": ["Accounting", "Financial Analysis", "Tax Preparation", "Business Consulting"],
    "Admin Support": ["Virtual Assistance", "Data Entry", "Project Management", "Customer Support"],
    "Customer Service": ["Phone Support", "Chat Support", "Email Management", "CRM Management"],
    "Data Science & Analytics": ["Data Analysis", "Machine Learning", "Business Intelligence", "Data Visualization"],
    "Design & Creative": ["Graphic Design", "UI/UX Design", "Logo Design", "Illustration"],
    "Engineering & Architecture": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Architecture"],
    "IT & Networking": ["Network Administration", "System Administration", "Security", "Cloud Computing"],
    "Legal": ["Contract Law", "Intellectual Property", "Legal Research", "Compliance"],
    "Sales & Marketing": ["Digital Marketing", "Social Media Marketing", "SEO", "Content Marketing"],
    "Translation": ["Language Translation", "Localization", "Proofreading", "Subtitling"],
    "Web, Mobile & Software Dev": ["Frontend Development", "Backend Development", "Mobile App Development", "Full Stack Development"],
    "Writing": ["Content Writing", "Copywriting", "Technical Writing", "Creative Writing"]
  };
  
  return specialtiesMap[category] || [];
};

// Get freelancer levels
export const getFreelancerLevels = () => {
  return [
    { value: "beginner", label: "Beginner" },
    { value: "experienced", label: "Experienced" },
    { value: "expert", label: "Expert" }
  ];
};