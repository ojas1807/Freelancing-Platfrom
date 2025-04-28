import Chat from "../models/Chat.js";

export const getChats1 = async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role !== "freelancer" && role !== "client") {
      return res.status(403).json({ message: "Forbidden: Insufficient role privileges" });
    }

    const chats = await Chat.find({ users: id })
      .populate("users", "name email avatar")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error: error.message });
  }
};

export const createChat1 = async (req, res) => {
  const { userIds } = req.body;

  try {
    const chat = await Chat.create({
      users: [...userIds, req.user.id],
    });

    // Emit chat creation event
    req.io.emit("newChat", chat);

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" });
  }
};