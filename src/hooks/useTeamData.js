import { useState, useCallback, useEffect } from "react";
import { fetchProjects } from "../services/projectService";

export const useTeamData = () => {
  const [data, setData] = useState({
    projects: [],
    assignedStages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await fetchProjects();
      setData({
        projects: projectsData,
      });
    } catch (err) {
      console.error("Failed to fetch team data:", err);
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
