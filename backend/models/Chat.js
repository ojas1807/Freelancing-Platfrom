import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Participants in the chat
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Reference to the last message
    updatedAt: { type: Date, default: Date.now }, // Auto-updated timestamp
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model("Chat", chatSchema);