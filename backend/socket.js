import { Server } from "socket.io";
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const message = await Message.create(messageData);
        const populatedMessage = await Message.findById(message._id)
          .populate("sender", "name avatar");

        await Chat.findByIdAndUpdate(messageData.chat, {
          lastMessage: message._id,
          updatedAt: Date.now(),
        });

        io.to(messageData.chat).emit("newMessage", populatedMessage);
        io.emit("chatUpdate", {
          _id: messageData.chat,
          lastMessage: populatedMessage.content,
          updatedAt: new Date()
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

export default configureSocket;