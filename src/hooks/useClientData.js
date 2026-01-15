import { useState, useCallback, useEffect } from "react";
import api from "../lib/axios";

export const useClientData = () => {
    const [data, setData] = useState({
        stats: null,
        projects: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [statsRes, projectsRes] = await Promise.all([
                api.get("/dashboard/client"),
                api.get("/projects") // Backend filters for client automatically
            ]);
            
            setData({
                stats: statsRes.data,
                projects: projectsRes.data
            });
        } catch (err) {
            console.error("Failed to fetch client data:", err);
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
