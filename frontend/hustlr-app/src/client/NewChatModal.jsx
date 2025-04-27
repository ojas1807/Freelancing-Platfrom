import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import axios from "axios";
import { useMessaging } from "../context/MessagingContext";

function NewChatModal({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const { createChat } = useMessaging();
  
  const currentUserId = localStorage.getItem('userId');

  // Fetch users when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Filter out current user
      const filteredUsers = response.data.filter(user => user._id !== currentUserId);
      setUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      console.error(err);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle user selection
  const toggleUserSelection = (user) => {
    if (selectedUsers.some(u => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Create a new chat with selected users
  const handleCreateChat = async () => {
    if (selectedUsers.length === 0) return;
    
    try {
      // Extract user IDs
      const userIds = selectedUsers.map(user => user._id);
      
      // Create the chat
      await createChat(userIds);
      
      // Close the modal and reset state
      setSelectedUsers([]);
      setSearchQuery("");
      onClose();
    } catch (err) {
      setError('Failed to create chat');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-medium">New Conversation</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 focus:outline-none" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select users to chat with
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search users..."
                className="w-full pl-8 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Selected users */}
          {selectedUsers.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedUsers.map(user => (
                <div 
                  key={user._id} 
                  className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                >
                  <span>{user.name}</span>
                  <button 
                    className="hover:text-gray-200 focus:outline-none" 
                    onClick={() => toggleUserSelection(user)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* User list */}
          <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading users...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No users found</div>
            ) : (
              filteredUsers.map(user => (
                <div
                  key={user._id}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                    selectedUsers.some(u => u._id === user._id) ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleUserSelection(user)}
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' fill='%23d1d5db'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='system-ui' fontSize='14' fill='%236b7280'%3E" +
                          user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("") +
                          "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                    {selectedUsers.some(u => u._id === user._id) && (
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-300 flex justify-end">
          <button
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCreateChat}
            disabled={selectedUsers.length === 0}
          >
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewChatModal;