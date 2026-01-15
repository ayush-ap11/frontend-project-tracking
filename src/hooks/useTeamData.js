import { useState, useCallback, useEffect } from "react";
import api from "../lib/axios";

export const useTeamData = () => {
    const [data, setData] = useState({
        projects: [],
        assignedStages: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const projectsRes = await api.get("/projects");
            // Assuming we might want to fetch stages specifically assigned to this user across all projects
            // For now, let's just get projects. If we need specific stages, we'd need a new endpoint or filter on frontend
            setData({
                projects: projectsRes.data
            });
        } catch (err) {
            console.error("Failed to fetch team data:", err);
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
