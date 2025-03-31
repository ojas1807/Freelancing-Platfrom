import ClientProfile from "../models/ClientProfile.js";

export const createClientProfile = async (req, res) => {
  try {

    
    // 1. Verify Authentication
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // 2. Check for existing profile (alternative approach)
    const existingProfile = await ClientProfile.findOne({ userId: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ 
        message: "Profile already exists.",
        existingProfile 
      });
    }

    // 3. Validate required fields
    const requiredFields = ['clientType', 'hiringSummary'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
        requiredFields
      });
    }

    // 4. Prepare profile data
    const profileData = {
      userId: req.user._id,
      ...req.body,
      // Ensure nested objects exist
      companyInfo: req.body.companyInfo || {},
      hiringScopeInfo: req.body.hiringScopeInfo || {},
      budget: req.body.budget || {}
    };

    // 5. Create and save profile
    const profile = new ClientProfile(profileData);
    await profile.save();

    // 6. Return success response
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile
    });

  } catch (error) {
    console.error("Profile creation error:", error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }

    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        message: "Profile already exists for this user"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Improved getClientProfile
export const getClientProfile = async (req, res) => {
  try {
    const profile = await ClientProfile.findOne({ userId: req.params.id })
      .populate('userId', 'firstName lastName email'); // Add user details

    if (!profile) {
      return res.status(404).json({ 
        message: "Profile not found",
        suggestion: "Create a profile first"
      });
    }

    res.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Improved updateClientProfile
export const updateClientProfile = async (req, res) => {
  try {
    // Verify ownership (user can only update their own profile)
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    const updatedProfile = await ClientProfile.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { 
        new: true,
        runValidators: true // Ensure updates are validated
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile
    });

  } catch (error) {
    console.error("Update profile error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }

    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};