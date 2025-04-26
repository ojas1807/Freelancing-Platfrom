import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

// Get all messages for a specific chat
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar") // Populate the sender's info
      .sort({ createdAt: 1 }); // Sort messages chronologically

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  const { chatId, content, files } = req.body;

  try {
    const message = await Message.create({
      chat: chatId,
      sender: req.user.id,
      content,
      files,
    });

    // Update the chat's last message and timestamp
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
      updatedAt: Date.now(),
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};