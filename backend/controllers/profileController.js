const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get current user profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'avatar', 'role']);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create or update profile
exports.createUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Destructure the request body
  const {
    bio,
    location,
    website,
    social,
    // Freelancer fields
    skills,
    hourlyRate,
    // Client fields
    company,
    industry,
    employeesCount,
    description
  } = req.body;
  
  // Build profile object
  const profileFields = {
    user: req.user.id,
    bio: bio || '',
    location: location || '',
    website: website || '',
    social: social || {}
  };
  
  // Build role-specific fields
  if (req.user.role === 'freelancer') {
    profileFields.freelancer = {
      skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
      hourlyRate: hourlyRate || 0
    };
  } else if (req.user.role === 'client') {
    profileFields.client = {
      company: company || '',
      industry: industry || '',
      employeesCount: employeesCount || '',
      description: description || ''
    };
  }
  
  try {
    // Find profile
    let profile = await Profile.findOne({ user: req.user.id });
    
    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      
      return res.json(profile);
    }
    
    // Create profile
    profile = new Profile(profileFields);
    await profile.save();
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update freelancer experience
exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Only freelancers can add experience' });
  }
  
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;
  
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    profile.freelancer.experience.unshift(newExp);
    await profile.save();
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update freelancer education
exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Only freelancers can add education' });
  }
  
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;
  
  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  };
  
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    profile.freelancer.education.unshift(newEdu);
    await profile.save();
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add portfolio item
exports.addPortfolio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Only freelancers can add portfolio items' });
  }
  
  const {
    title,
    description,
    image,
    link
  } = req.body;
  
  const newPortfolio = {
    title,
    description,
    image,
    link
  };
  
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    profile.freelancer.portfolio.unshift(newPortfolio);
    await profile.save();
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};