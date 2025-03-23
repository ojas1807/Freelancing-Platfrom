import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    const login = async (email, password) => {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Send authentication cookies
            body: JSON.stringify({ email, password }),
        });
    
        if (res.ok) {
            const data = await res.json();
            console.log("Login Response:", data);  // 🔥 Debugging log to check response
            setUser(data.user); // Store user info in context
            return data.user.role; // ✅ Return role for redirection
        } else {
            throw new Error('Login failed');
        }
    };

    const register = async (userData) => {
        await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
    };

    const logout = async () => {
        await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
    };

    const getProfile = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
