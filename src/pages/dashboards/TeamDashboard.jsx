import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import ProjectsGrid from "../../components/admin/ProjectsGrid"; 
import CreateProjectModal from "../../components/CreateProjectModal";
import { useTeamData } from "../../hooks/useTeamData";
import { useProjectMutations } from "../../hooks/useProjectMutations";
import { CheckCircle2, Clock, AlertCircle, LayoutList } from "lucide-react";

const TeamStats = ({ projects }) => {
    const total = projects.length;
    const active = projects.filter(p => p.status === 'ACTIVE' || p.status === 'IN_PROGRESS' || p.status === 'ON_TRACK').length;
    const completed = projects.filter(p => p.status === 'COMPLETED').length;
    const delayed = projects.filter(p => p.status === 'DELAYED').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <LayoutList size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Projects</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{total}</h3>
                    </div>
                </div>
            </div>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{active}</h3>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{completed}</h3>
                    </div>
                </div>
            </div>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Delayed</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{delayed}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TeamDashboard = () => {
  const { projects, loading, error, refetch } = useTeamData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { updateProject, isSubmitting } = useProjectMutations(() => {
     refetch();
     setIsModalOpen(false);
     setEditingProject(null);
  });
  
  const handleEditProject = (project) => {
      setEditingProject(project);
      setIsModalOpen(true);
  };

  const handleSaveProject = async (projectData) => {
      if (editingProject) {
          await updateProject(editingProject._id, projectData);
      }
  };

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
         <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Team Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your assigned projects and tasks</p>
        </header>

        <TeamStats projects={projects} />

        <ProjectsGrid projects={projects} onEdit={handleEditProject} />
      </main>
      
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }} 
        onSubmit={handleSaveProject}
        // Team members typically don't see full client list or all members to re-assign, 
        // they usually just edit description/name. 
        // We pass empty lists or existing if needed, but per requirements we just want "update project".
        clients={[]} 
        teamMembers={[]}
        initialData={editingProject}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default TeamDashboard;
