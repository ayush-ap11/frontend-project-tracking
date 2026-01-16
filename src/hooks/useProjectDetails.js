import { useCallback, useEffect, useState } from "react";
import {
  fetchProject,
  fetchProjectNotes,
  fetchProjectActivities,
  createProjectNote,
} from "../services/projectService";

const useProjectDetails = (projectId) => {
  const [project, setProject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteError, setNoteError] = useState(null);
  const [sendingNote, setSendingNote] = useState(false);

  const loadProjectData = useCallback(async () => {
    if (!projectId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [projectData, notesData] = await Promise.all([
        fetchProject(projectId),
        fetchProjectNotes(projectId),
      ]);

      setProject(projectData);
      setNotes(notesData);

      try {
        const activityData = await fetchProjectActivities(projectId);
        setActivities(activityData);
      } catch (activityError) {
        console.warn("Activity logs not accessible", activityError);
        setActivities([]);
      }
    } catch (loadError) {
      console.error("Failed to load project details", loadError);
      setError("Failed to load project details");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const handleNoteChange = (value) => {
    setNoteContent(value);
  };

  const handleNoteSubmit = async (event) => {
    event.preventDefault();

    if (!noteContent.trim()) {
      return;
    }

    setSendingNote(true);
    setNoteError(null);

    try {
      await createProjectNote(projectId, { content: noteContent });
      setNoteContent("");
      const refreshedNotes = await fetchProjectNotes(projectId);
      setNotes(refreshedNotes);
    } catch (submitError) {
      console.error("Failed to add note", submitError);
      setNoteError("Failed to add note");
    } finally {
      setSendingNote(false);
    }
  };

  return {
    project,
    notes,
    activities,
    loading,
    error,
    noteContent,
    noteError,
    sendingNote,
    handleNoteChange,
    handleNoteSubmit,
    refresh: loadProjectData,
  };
};

export default useProjectDetails;
