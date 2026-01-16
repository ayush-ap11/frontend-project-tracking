import axios from "axios";

const defaultBackendUrl = "http://localhost:8080";
const backendBaseUrl = (
  import.meta.env?.VITE_BACKEND_URL || defaultBackendUrl
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${backendBaseUrl}/api`,
  withCredentials: true,
});

export default api;
