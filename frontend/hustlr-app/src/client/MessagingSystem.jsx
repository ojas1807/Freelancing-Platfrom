import React, { useState, useEffect } from "react";
import {
  MessageCircleCode,
  Search,
  Send,
} from "lucide-react";
import useAuth from "../hooks/useAuth"; // Hook for authentication
import axios from "axios"; // For API requests

const API_BASE_URL = "http://localhost:5000/api/messages"; // Update with your backend URL

function MessagingSystem() {
  const { token, user } = useAuth(); // Get auth token and user
  const [chats, setChats] = useState([]); // List of chats
  const [selectedChat, setSelectedChat] = useState(null); // Currently selected chat
  const [messages, setMessages] = useState([]); // Messages for the selected chat
  const [loadingMessages, setLoadingMessages] = useState(false); // Loading state for messages
  const [message, setMessage] = useState(""); // Message input

  // Fetch all chats
  const fetchChats = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(response.data);
      if (response.data.length > 0) {
        setSelectedChat(response.data[0]._id); // Select the first chat by default
      }
    } catch (error) {
      console.error("Error fetching chats:", error.response?.data || error.message);
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId) => {
    if (!token || !chatId) return;

    try {
      setLoadingMessages(true);
      const response = await axios.get(`${API_BASE_URL}/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Send a message to a chat
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/messages`,
        { chatId: selectedChat, content: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]); // Append the new message
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  // Handle "Enter" key for sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
  }, [token]);

  // Fetch messages whenever the selected chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat]);

  return (
    <>
      <div className="flex items-center gap-2 mb-2 mr-2 ml-2">
        <MessageCircleCode className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-bold">Conversations</h1>
      </div>
      <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row rounded-lg overflow-hidden mt-2 mb-2 mr-2 ml-2 border border-gray-300">
        {/* Chat List */}
        <div className="w-full md:w-80 border-r border-gray-300 flex flex-col">
          <div className="p-4 border-b border-gray-300">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search conversations..."
                className="w-full pl-8 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                  selectedChat === chat._id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedChat(chat._id)}
              >
                <div className="relative">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{chat.name}</span>
                    <span className="text-xs text-gray-500">{chat.updatedAt}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMessage?.content || "No messages yet"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {loadingMessages ? (
              <div>Loading messages...</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.sender._id === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      msg.sender._id === user.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    } rounded-lg p-3`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-end gap-2">
              <textarea
                placeholder="Type your message..."
                className="min-h-[80px] flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button
                className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagingSystem;