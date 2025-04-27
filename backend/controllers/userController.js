import User from "../models/User.js";

// Get all users (for chat creation)
export const getUsers = async (req, res) => {
  try {
    // Get all users except the current user
    // Only return necessary fields to reduce data transfer
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select("name email avatar")
      .sort({ name: 1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
  };