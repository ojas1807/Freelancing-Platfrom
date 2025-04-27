import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// Get all chats for the logged-in user


// Get all chats for the logged-in user
export const getChats = async (req, res) => {
  try {
    const { id, role } = req.user; // Extract user ID and role from req.user

    // Check if the user has the correct role
    if (role !== "freelancer" && role !== "client") {
      return res.status(403).json({ message: "Forbidden: Insufficient role privileges" });
    }

    // Fetch chats for the authenticated user
    const chats = await Chat.find({ users: id })
      .populate("users", "name email avatar") // Populate user details
      .populate("lastMessage") // Populate the last message
      .sort({ updatedAt: -1 }); // Sort by most recent activity

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error: error.message });
  }
};

// Create a new chat
export const createChat = async (req, res) => {
  const { userIds } = req.body; // Participants' IDs

  try {
    
    const chat = await Chat.create({
      users: [...userIds, req.user.id],
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" });
  }
};

