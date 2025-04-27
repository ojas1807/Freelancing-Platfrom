// Base URL for the API
const BASE_URL = 'http://localhost:5000/api'; // Adjust based on your API URL

// Helper function to get the auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to handle fetch requests
const fetchRequest = async (url, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// Chat API services
export const chatService = {
    getChats: async () => {
        return fetchRequest('/chats');
    },

    createChat: async (userIds) => {
        return fetchRequest('/chats', {
            method: 'POST',
            body: JSON.stringify({ userIds }),
        });
    },
};

// Message API services
export const messageService = {
    getMessages: async (chatId) => {
        return fetchRequest(`/messages/${chatId}`);
    },

    sendMessage: async (chatId, content, files = []) => {
        return fetchRequest('/messages', {
            method: 'POST',
            body: JSON.stringify({
                chatId,
                content,
                files,
            }),
        });
    },

    uploadFiles: async (formData) => {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
};