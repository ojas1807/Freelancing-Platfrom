// context/MessagingContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { chatService, messageService } from '../services/message';

const MessagingContext = createContext();

export const useMessaging = () => useContext(MessagingContext);

export const MessagingProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);


  // Fetch all chats
  const fetchChats = async () => {
    try {
      setLoading(true);
      const fetchedChats = await chatService.getChats();
      setChats(fetchedChats);
      
      // If no chat is selected and we have chats, select the first one
      if (!selectedChat && fetchedChats.length > 0) {
        setSelectedChat(fetchedChats[0]._id);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch chats');
      setLoading(false);
      console.error(err);
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (chatId) => {
    if (!chatId) return;
    
    try {
      setMessagesLoading(true);
      const fetchedMessages = await messageService.getMessages(chatId);
      setMessages(fetchedMessages);
      setMessagesLoading(false);
    } catch (err) {
      setError('Failed to fetch messages');
      setMessagesLoading(false);
      console.error(err);
    }
  };

  // Send a new message
  const sendMessage = async (chatId, content, files = []) => {
    try {
        // Convert FileList to array if needed
    const filesArray = Array.isArray(files) ? files : Array.from(files || []);
    
    // Validate files before sending
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    filesArray.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds 10MB limit`);
      }
    });



      const newMessage = await messageService.sendMessage(chatId, content, filesArray);
      
      // Update messages list
      setMessages(prevMessages => [...prevMessages, newMessage]);
      
      // Update chat last message in the chat list
      setChats(prevChats => 
        prevChats.map(chat => 
          chat._id === chatId 
            ? { ...chat, lastMessage: newMessage, updatedAt: new Date() } 
            : chat
        ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
      
      return newMessage;
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
      return null;
    }
  };

  // Create a new chat
  const createChat = async (userIds) => {
    try {
      const newChat = await chatService.createChat(userIds);
      setChats(prevChats => [newChat, ...prevChats]);
      setSelectedChat(newChat._id);
      return newChat;
    } catch (err) {
      setError('Failed to create chat');
      console.error(err);
      return null;
    }
  };

  // Handle file uploads
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return [];
    
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      
      const uploadedFiles = await messageService.uploadFiles(formData);
      return uploadedFiles;
    } catch (err) {
      setError('Failed to upload files');
      console.error(err);
      return [];
    }
  };

  // Effect to fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Effect to fetch messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const value = {
    chats,
    loading,
    error,
    selectedChat,
    messages,
    messagesLoading,
    setSelectedChat,
    sendMessage,
    createChat,
    uploadFiles,
    fetchChats,
    fetchMessages,
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
};