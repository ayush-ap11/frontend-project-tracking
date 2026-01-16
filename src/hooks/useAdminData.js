import { useState, useCallback, useEffect } from "react";
import { fetchAdminDashboard } from "../services/dashboardService";
import { fetchProjects } from "../services/projectService";
import { fetchUsers } from "../services/userService";

export const useAdminData = () => {
  const [data, setData] = useState({
    stats: null,
    projects: [],
    clients: [],
    teamMembers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, projectsData, clientsData, teamData] =
        await Promise.all([
          fetchAdminDashboard(),
          fetchProjects(),
          fetchUsers("CLIENT"),
          fetchUsers("TEAM"),
        ]);

      setData({
        stats: statsData,
        projects: projectsData,
        clients: clientsData,
        teamMembers: teamData,
      });
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
};
