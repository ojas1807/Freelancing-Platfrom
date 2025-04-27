import Freelancer from '../models/findtalentmodel.js'; // Matches the file name exactly

// Get all freelancers with optional filters
export const getFreelancers = async (req, res) => {
  try {
    const { searchQuery, skills, rateRange, experienceLevel, availability } = req.query;
    let filter = {};

    // Search query filter
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      filter.$or = [
        { name: regex },
        { title: regex },
        { description: regex },
        { skills: { $in: [searchQuery] } },
      ];
    }

    // Skills filter
    if (skills) {
      filter.skills = { $in: skills.split(',') };
    }

    // Rate range filter
    if (rateRange) {
      const [min, max] = rateRange.split('-').map(Number);
      filter.rate = { $regex: `^\\$(${min}-${max})\\/hr$` };
    }

    // Experience level filter
    if (experienceLevel) {
      const experienceYears = {
        junior: { $lte: 2 },
        mid: { $gt: 2, $lte: 5 },
        senior: { $gt: 5 },
      };
      const range = experienceYears[experienceLevel];
      if (range) filter.experience = { $regex: new RegExp(`^(\\d+) years$`, 'i') };
    }

    // Availability filter
    if (availability) {
      filter.availability = new RegExp(availability, 'i');
    }

    const freelancers = await Freelancer.find(filter);
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching freelancers', error });
  }
};

// Add a freelancer
export const addFreelancer = async (req, res) => {
  try {
    const freelancer = new Freelancer(req.body);
    await freelancer.save();
    res.status(201).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: 'Error adding freelancer', error });
  }
};

// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const freelancer = await Freelancer.findById(id);
    if (!freelancer) return res.status(404).json({ message: 'Freelancer not found' });

    freelancer.isBookmarked = !freelancer.isBookmarked;
    await freelancer.save();

    res.status(200).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling bookmark', error });
  }
};

// Delete a freelancer
export const deleteFreelancer = async (req, res) => {
  try {
    const { id } = req.params;
    const freelancer = await Freelancer.findByIdAndDelete(id);
    if (!freelancer) return res.status(404).json({ message: 'Freelancer not found' });

    res.status(200).json({ message: 'Freelancer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting freelancer', error });
  }
};