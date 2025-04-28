import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const getMsg = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      users: req.user._id
    });

    if (!chat) {
      return res.status(403).json({ message: "Not authorized for this chat" });
    }

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const sendMsg = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const files = req.files || [];

    const messageData = {
      chat: chatId,
      sender: req.user.id,
      content,
      files: files.map(file => ({
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        path: file.path
      }))
    };

    // Emit the message via Socket.io
    req.io.emit("sendMessage", messageData);

    res.status(201).json({ status: "pending", message: "Message is being sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};