import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import CreateProjectModal from "../../components/CreateProjectModal";
import DashboardHeader from "../../components/admin/DashboardHeader";
import DashboardStats from "../../components/admin/DashboardStats";
import ProjectsGrid from "../../components/admin/ProjectsGrid";
import { useAdminData } from "../../hooks/useAdminData";
import { useProjectMutations } from "../../hooks/useProjectMutations";

const AdminDashboard = () => {
  // 1. Data Fetching Hook
  const { stats, projects, clients, teamMembers, loading, error, refetch } = useAdminData();

  // 2. Local UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // 3. Mutations Hook
  const { createProject, updateProject, isSubmitting } = useProjectMutations(() => {
    refetch(); // Refresh data on success
    setIsModalOpen(false);
    setEditingProject(null);
  });

  // 4. Handlers
  const handleSaveProject = async (projectData) => {
    if (editingProject) {
      await updateProject(editingProject._id, projectData);
    } else {
      await createProject(projectData);
    }
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // 5. Render Logic
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-red-500 mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Retry
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24">
        
        <DashboardHeader onNewProject={openNewProjectModal} />

        <DashboardStats stats={stats} />

        <ProjectsGrid projects={projects} onEdit={openEditProjectModal} />

      </main>

      {/* Modal is rendered conditionally or just controlled via isOpen */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleSaveProject}
        clients={clients}
        teamMembers={teamMembers}
        initialData={editingProject}
        isSubmitting={isSubmitting}
      />

    </div>
  );
};

export default AdminDashboard;
