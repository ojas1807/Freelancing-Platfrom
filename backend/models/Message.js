import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // The chat this message belongs to
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // The sender of the message
    content: { type: String, required: true }, // Message text content
    files: [{ name: String, type: String, size: String }], // Optional attachment files
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model("Message", messageSchema);