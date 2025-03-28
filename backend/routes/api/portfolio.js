const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const profileController = require('../../controllers/profileController');
const auth = require('../../middleware/auth');
const { checkRole } = require('../../middleware/roleCheck');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, profileController.getMyProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('bio', 'Bio cannot exceed 500 characters').optional().isLength({ max: 500 })
    ]
  ],
  profileController.createUpdateProfile
);

// @route   PUT api/profile/experience
// @desc    Add experience to profile
// @access  Private (Freelancer only)
router.put(
  '/experience',
  [
    auth,
    checkRole('freelancer'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  profileController.addExperience
);

// @route   PUT api/profile/education
// @desc    Add education to profile
// @access  Private (Freelancer only)
router.put(
  '/education',
  [
    auth,
    checkRole('freelancer'),
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  profileController.addEducation
);

// @route   PUT api/profile/portfolio
// @desc    Add portfolio item to profile
// @access  Private (Freelancer only)
router.put(
  '/portfolio',
  [
    auth,
    checkRole('freelancer'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ]
  ],
  profileController.addPortfolio
);

module.exports = router;