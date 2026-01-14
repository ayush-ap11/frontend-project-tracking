import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Updated to match backend port
  withCredentials: true, // Important for cookies
});

export default api;
