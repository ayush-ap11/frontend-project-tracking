import api from "../lib/axios";

export const fetchAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};

export const fetchClientDashboard = async () => {
  const response = await api.get("/dashboard/client");
  return response.data;
};
