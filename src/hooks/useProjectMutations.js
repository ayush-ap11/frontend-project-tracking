import { useState, useCallback } from "react";
import api from "../lib/axios";

export const useProjectMutations = (onSuccess) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createProject = useCallback(async (projectData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post("/projects", projectData);
      if (onSuccess) onSuccess();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [onSuccess]);

  const updateProject = useCallback(async (id, projectData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.put(`/projects/${id}`, projectData);
      if (onSuccess) onSuccess();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [onSuccess]);

  return { createProject, updateProject, isSubmitting, mutationError: error };
};
