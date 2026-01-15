import { useState, useCallback, useEffect } from "react";
import api from "../lib/axios";

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
      
      const [statsRes, projectsRes, clientsRes, teamRes] = await Promise.all([
        api.get("/dashboard/admin"),
        api.get("/projects"),
        api.get("/auth/users?role=CLIENT"),
        api.get("/auth/users?role=TEAM"),
      ]);

      setData({
        stats: statsRes.data,
        projects: projectsRes.data,
        clients: clientsRes.data,
        teamMembers: teamRes.data,
      });
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      setError(err.response?.data?.message || err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
};
