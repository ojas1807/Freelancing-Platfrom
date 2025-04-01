import Talent from '../models/talent.js';

// Get all talents
export const getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.find();
    res.status(200).json(talents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new talent
export const createTalent = async (req, res) => {
  const talent = new Talent(req.body);
  try {
    const newTalent = await talent.save();
    res.status(201).json(newTalent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single talent
export const getTalent = async (req, res) => {
  try {
    const talent = await Talent.findById(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    res.status(200).json(talent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a talent
export const updateTalent = async (req, res) => {
  try {
    const talent = await Talent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    res.status(200).json(talent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a talent
export const deleteTalent = async (req, res) => {
  try {
    const talent = await Talent.findByIdAndDelete(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });
    res.status(200).json({ message: 'Talent deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};