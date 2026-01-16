/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  logout as logoutRequest,
} from "../services/authService";

const AuthContext = createContext();

const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const loading = false;

  const login = async (email, password) => {
    try {
      const userData = await loginRequest({ email, password });
      setUser(userData);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(userData));
      }
      return userData;
    } catch (error) {
      throw error.response?.data?.message || error.message || "Login failed";
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await registerRequest(userData);
      setUser(registeredUser);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(registeredUser));
      }
      return registeredUser;
    } catch (error) {
      throw (
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
