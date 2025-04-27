import { useState, useRef, useEffect } from "react";
import { ArrowUpCircle, File, Image, MessageCircleCode, Paperclip, Search, Send, User, Plus } from "lucide-react";
import { useMessaging } from "../context/MessagingContext";
import { format } from "date-fns";
import NewChatModal from "../client/NewChatModal";

function F_MessagingSystem() {
  const {
    chats,
    loading,
    selectedChat,
    setSelectedChat,
    messages,
    messagesLoading,
    sendMessage,
  } = useMessaging();
  const currentUserId = localStorage.getItem('userID') || '';
  const currentUserName = localStorage.getItem('userName') || 'You';
  
  const [messageText, setMessageText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Format timestamp to readable time
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, "h:mm a");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  const filteredChats = chats.filter(chat => {
    // Handle case where chat might not have users populated
    if (!chat.users || chat.users.length === 0) return false;
    
    const otherUser = chat.users.find(user => user._id !== localStorage.getItem('userID'));
    if (!otherUser) return false;
    
    // Add a check for name property
    return (otherUser.name && otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (chat.lastMessage && chat.lastMessage.content && 
            chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Handle sending a message
  const handleSendMessage = async () => {
    if (messageText.trim() || uploadingFiles.length > 0) {
      try {
        // Prepare files metadata
        const filesToSend = uploadingFiles.map(file => ({
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          size: formatFileSize(file.size)
        }));
        
        // Send the message
        await sendMessage(selectedChat, messageText, filesToSend);
        
        // Clear input and files
        setMessageText("");
        setUploadingFiles([]);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // Handle key down event for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadingFiles(prev => [...prev, ...files]);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove a file from the upload list
  const removeFile = (index) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Return loading state
  if (loading) {
    return <div className="flex items-center justify-center h-[calc(100vh-8rem)]">Loading chats...</div>;
  }


  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2 mr-2 ml-2">
        <div className="flex items-center">
          <MessageCircleCode className="h-5 w-5 text-primary mr-2" />
          <h1 className="text-xl font-bold">Conversations</h1>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
          onClick={() => setIsNewChatModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {chats.length === 0 ? "No conversations yet" : "No conversations found"}
                <div className="mt-2">
                  <button
                    className="text-primary hover:underline text-sm focus:outline-none"
                    onClick={() => setIsNewChatModalOpen(true)}
                  >
                    Start a new conversation
                  </button>
                </div>
              </div>
            ) : (
              filteredChats.map((chat) => {
                // Find the other user in the chat (not the current user)
                const currentUserId = localStorage.getItem('userId');
                const otherUser = chat.users?.find(user => user._id !== currentUserId);
                if (!otherUser) return null;
                
                return (
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
                          src={otherUser.avatar || "/placeholder.svg"}
                          alt={otherUser.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='16' fill='%236b7280'%3E" +
                              otherUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("") +
                              "%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      {/* Online status indicator could be implemented here */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">{otherUser.name}</span>
                        <span className="text-xs text-gray-500">
                          {chat.lastMessage ? formatMessageTime(chat.lastMessage.createdAt) : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.lastMessage ? chat.lastMessage.content : 'No messages yet'}
                      </p>
                      {/* Project info could be added here if your Chat model includes it */}
                      {otherUser.email && (
                        <p className="text-xs text-primary mt-1 truncate">{otherUser.email}</p>
                      )}
                    </div>
                    {/* Unread indicator could be implemented here */}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentChat = chats.find(c => c._id === selectedChat);
                    if (!currentChat) return null;
                    
                    const otherUser = currentChat.users?.find(user => user._id !== localStorage.getItem('userID'));
                    if (!otherUser) return null;
                    
                    return (
                      <>
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={otherUser.avatar || "/placeholder.svg"}
                            alt={otherUser.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='16' fill='%236b7280'%3E" +
                                otherUser.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") +
                                "%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{otherUser.name}</div>
                          <div className="text-xs text-gray-500">{otherUser.email}</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <User className="h-5 w-5" />
                    </button>
                    {showTooltip && (
                      <div className="absolute right-0 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                        View Profile
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messagesLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <p>Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = currentUserId // Replace with actual logic to determine if the message is from the current user
                    // Placeholder for sender avatar, replace with actual logic to get sender's avatar
                    const senderAvatar = "/placeholder.svg";
                    return (
                      <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] ${
                            isMe ? "bg-primary text-white" : "bg-gray-100 text-gray-900"
                          } rounded-lg p-3`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          {msg.files && msg.files.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {msg.files.map((file, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center gap-2 p-2 rounded ${
                                    isMe ? "bg-white/10" : "bg-white"
                                  }`}
                                >
                                  {file.type === "image" ? <Image className="h-4 w-4" /> : <File className="h-4 w-4" />}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{file.name}</p>
                                    <p className="text-xs opacity-70">{file.size}</p>
                                  </div>
                                  <button className="h-6 w-6 rounded-full p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                                    <ArrowUpCircle className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className={`text-xs mt-1 ${isMe ? "text-white/70" : "text-gray-500"}`}>
                            {formatMessageTime(msg.createdAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-300">
                {/* Selected files preview */}
                {uploadingFiles.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {uploadingFiles.map((file, index) => (
                      <div key={index} className="bg-gray-100 rounded p-2 flex items-center gap-2">
                        {file.type.startsWith('image/') ? (
                          <Image className="h-4 w-4" />
                        ) : (
                          <File className="h-4 w-4" />
                        )}
                        <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                        <button 
                          className="text-gray-500 hover:text-red-500" 
                          onClick={() => removeFile(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-end gap-2">
                  <textarea
                    placeholder="Type your message..."
                    className="min-h-[80px] flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                    />
                    <button 
                      className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button
                      className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim() && !uploadingFiles.length}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <p className="mb-4">Select a conversation to start messaging</p>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none"
                onClick={() => setIsNewChatModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Start New Conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      <NewChatModal 
        isOpen={isNewChatModalOpen} 
        onClose={() => setIsNewChatModalOpen(false)} 
      />
    </>
  );
}

export default F_MessagingSystem;