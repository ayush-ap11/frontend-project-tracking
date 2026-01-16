import { useState, useCallback, useEffect } from "react";
import { fetchClientDashboard } from "../services/dashboardService";
import { fetchProjects } from "../services/projectService";

export const useClientData = () => {
  const [data, setData] = useState({
    stats: null,
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, projectsData] = await Promise.all([
        fetchClientDashboard(),
        fetchProjects(),
      ]);

      setData({
        stats: statsData,
        projects: projectsData,
      });
    } catch (err) {
      console.error("Failed to fetch client data:", err);
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
