import api from "../lib/axios";

export const fetchProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const fetchProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const createProject = async (payload) => {
  const response = await api.post("/projects", payload);
  return response.data;
};

export const updateProject = async (projectId, payload) => {
  const response = await api.put(`/projects/${projectId}`, payload);
  return response.data;
};

export const fetchProjectNotes = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/note`);
  return response.data;
};

export const fetchProjectActivities = async (projectId) => {
  const response = await api.get(`/projects/${projectId}/activity`);
  return response.data;
};

export const createProjectNote = async (projectId, payload) => {
  await api.post(`/projects/${projectId}/note`, payload);
};
