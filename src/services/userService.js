import api from "../lib/axios";

export const fetchUsers = async (role) => {
  const query = role ? `?role=${role}` : "";
  const response = await api.get(`/auth/users${query}`);
  return response.data;
};

export const fetchUserById = async (userId) => {
  const users = await fetchUsers();
  return users.find((user) => user._id === userId) || null;
};
