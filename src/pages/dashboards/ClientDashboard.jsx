import React from "react";
import Navbar from "../../components/Navbar";
import ProjectsGrid from "../../components/admin/ProjectsGrid"; 
import ClientStats from "../../components/client/ClientStats";
import { useClientData } from "../../hooks/useClientData";

const ClientDashboard = () => {
  const { stats, projects, loading, error } = useClientData();

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Client Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your ongoing projects and status</p>
        </header>

        <ClientStats stats={stats} />

        <ProjectsGrid 
            projects={projects} 
            // Clients cannot edit projects key details directly in dashboard usually.
            // If they can edit 'description' or 'add notes', that's in details.
            // Requirement said "feature is needed or access is needed on client side".
            // Usually clients view progress. 
            // I will NOT pass onEdit, so the edit button won't show.
            onEdit={null} 
        />
      </main>
    </div>
  );
};

export default ClientDashboard;
