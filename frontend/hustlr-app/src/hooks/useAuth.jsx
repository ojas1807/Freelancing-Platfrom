import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    // Load user from local storage immediately on initialization
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userID", userData.id);
    localStorage.setItem("userRole", userData.role);
    setUser(userData); // Update state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
