import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import useProjectDetails from "../hooks/useProjectDetails";
import ProjectHeader from "../components/projectDetails/ProjectHeader";
import ProjectTeamMembers from "../components/projectDetails/ProjectTeamMembers";
import ProjectNotes from "../components/projectDetails/ProjectNotes";
import ProjectActivityLog from "../components/projectDetails/ProjectActivityLog";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useProjectDetails(id);
  const { user } = useAuth();
  const canNavigateToUser = user?.role === "ADMIN";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 text-center">
        <h2 className="text-2xl font-bold dark:text-white">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 text-center">
        <h2 className="text-2xl font-bold dark:text-white">
          Project Not Found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <ProjectHeader project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {project.teamMembers && (
              <ProjectTeamMembers
                teamMembers={project.teamMembers}
                canNavigate={canNavigateToUser}
              />
            )}

            <ProjectNotes
              notes={notes}
              noteContent={noteContent}
              noteError={noteError}
              sendingNote={sendingNote}
              onNoteChange={handleNoteChange}
              onSubmit={handleNoteSubmit}
            />
          </div>

          <div className="space-y-8">
            <ProjectActivityLog activities={activities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
