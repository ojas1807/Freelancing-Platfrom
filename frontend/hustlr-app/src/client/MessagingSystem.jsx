

import { useState } from "react"
import { ArrowUpCircle, File, Image, MessageCircleCode, Paperclip, Search, Send, User } from "lucide-react"


function MessagingSystem() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)

  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've sent you the updated designs for review.",
      time: "10:30 AM",
      unread: 2,
      online: true,
      project: "E-commerce Website Redesign",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When can we schedule a call to discuss the app UI?",
      time: "Yesterday",
      unread: 0,
      online: false,
      project: "Mobile App UI Design",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The SEO report for April is ready for your review.",
      time: "Yesterday",
      unread: 0,
      online: true,
      project: "SEO Optimization",
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've completed the first batch of blog articles.",
      time: "Monday",
      unread: 0,
      online: false,
      project: "Content Writing for Blog",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Hi there! I've been working on the homepage redesign as discussed.",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Great! How's the progress coming along?",
      time: "10:18 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "It's going well. I've completed the hero section and the product grid layout.",
      time: "10:22 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I've sent you the updated designs for review. Let me know what you think!",
      time: "10:30 AM",
      isMe: false,
      files: [
        {
          name: "homepage-design-v2.fig",
          type: "file",
          size: "4.2 MB",
        },
        {
          name: "product-grid-mockup.jpg",
          type: "image",
          size: "1.8 MB",
        },
      ],
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the backend
      // and then update the UI with the new message
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
    <div className="flex items-center gap-2  mb-2 mr-2 ml-2">
          <MessageCircleCode className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">Conversations</h1>
        </div>
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row rounded-lg overflow-hidden mt-2 mb-2 mr-2 ml-2 border border-gray-300 ">
  
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
              key={chat.id}
              className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-100  ${
                selectedChat === chat.id ? "bg-gray-100 " : ""
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="relative">
                {/* Avatar component */}
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='16' fill='%236b7280'%3E" +
                        chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("") +
                        "%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm">{chat.name}</span>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                <p className="text-xs text-primary mt-1 truncate">{chat.project}</p>
              </div>
              {chat.unread > 0 && (
                <span className="ml-auto px-2 py-0.5 text-xs font-medium text-white bg-primary rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar component */}
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <img
                src={chats.find((c) => c.id === selectedChat)?.avatar || "/placeholder.svg"}
                alt={chats.find((c) => c.id === selectedChat)?.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const name = chats.find((c) => c.id === selectedChat)?.name || ""
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='16' fill='%236b7280'%3E" +
                    name
                      .split(" ")
                      .map((n) => n[0])
                      .join("") +
                    "%3C/text%3E%3C/svg%3E"
                }}
              />
            </div>
            <div>
              <div className="font-medium">{chats.find((c) => c.id === selectedChat)?.name}</div>
              <div className="text-xs text-gray-500">{chats.find((c) => c.id === selectedChat)?.project}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Tooltip component */}
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
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] ${
                  msg.isMe ? "bg-primary text-white" : "bg-gray-100  text-gray-900 "
                } rounded-lg p-3`}
              >
                {!msg.isMe && (
                  <div className="flex items-center gap-2 mb-1">
                    {/* Avatar component */}
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <img
                        src={msg.avatar || "/placeholder.svg"}
                        alt={msg.sender}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='10' fill='%236b7280'%3E" +
                            msg.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("") +
                            "%3C/text%3E%3C/svg%3E"
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium">{msg.sender}</span>
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
                {msg.files && (
                  <div className="mt-2 space-y-2">
                    {msg.files.map((file, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded ${
                          msg.isMe ? "bg-white/10" : "bg-white "
                        }`}
                      >
                        {file.type === "image" ? <Image className="h-4 w-4" /> : <File className="h-4 w-4" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{file.name}</p>
                          <p className="text-xs opacity-70">{file.size}</p>
                        </div>
                        <button className="h-6 w-6 rounded-full p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100  focus:outline-none">
                          <ArrowUpCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className={`text-xs mt-1 ${msg.isMe ? "text-white/70" : "text-gray-500"}`}>{msg.time}</div>
              </div>
            </div>
          ))}
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
            <div className="flex flex-col gap-2">
              <button className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                <Paperclip className="h-4 w-4" />
              </button>
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
    </div>
    </>
  )
}

export default MessagingSystem;