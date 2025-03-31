import FreelancerProfile from '../models/FreelancerProfile.js';

// Create a new freelancer profile
export const createProfile = async (req, res) => {
  try {
    // Set the userId from authenticated user
    const profileData = {
      ...req.body,
      userId: req.user._id
    };
    
    const profile = new FreelancerProfile(profileData);
    await profile.save();
    
    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors ? Object.values(error.errors).map(err => err.message) : null
    });
  }
};

// Get the current user's profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get profile by ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.params.userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors ? Object.values(error.errors).map(err => err.message) : null
    });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOneAndDelete({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update specific step of profile setup
export const updateProfileStep = async (req, res) => {
  try {
    const { stepNumber } = req.params;
    const stepData = req.body;
    
    // First get the current profile
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    // Update the specific step data
    const updatedProfile = await FreelancerProfile.findOneAndUpdate(
      { userId: req.user.id },
      { 
        ...stepData,
        // Only increment completedSteps if this step is higher than current value
        completedSteps: Math.max(profile.completedSteps, parseInt(stepNumber))
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors ? Object.values(error.errors).map(err => err.message) : null
    });
  }
};

// Add work experience
export const addWorkExperience = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    profile.workExperience.push(req.body);
    await profile.save();
    
    res.status(201).json({
      success: true,
      data: profile.workExperience[profile.workExperience.length - 1]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors ? Object.values(error.errors).map(err => err.message) : null
    });
  }
};

// Update work experience
export const updateWorkExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    const experienceIndex = profile.workExperience.findIndex(
      exp => exp._id.toString() === experienceId
    );
    
    if (experienceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    // Update the experience
    profile.workExperience[experienceIndex] = {
      ...profile.workExperience[experienceIndex].toObject(),
      ...req.body
    };
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      data: profile.workExperience[experienceIndex]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors ? Object.values(error.errors).map(err => err.message) : null
    });
  }
};

// Delete work experience
export const deleteWorkExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    profile.workExperience = profile.workExperience.filter(
      exp => exp._id.toString() !== experienceId
    );
    
    await profile.save();
    
    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search profiles
export const searchProfiles = async (req, res) => {
  try {
    const { category, skills, specialties, level, page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    
    if (specialties) {
      query.specialties = { $in: specialties.split(',') };
    }
    
    if (level) {
      query.freelancerLevel = level;
    }
    
    const profiles = await FreelancerProfile.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
      
    const total = await FreelancerProfile.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: profiles,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};