import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StatsCard from "../../components/StatsCard";
import ProjectCard from "../../components/ProjectCard";
import CreateProjectModal from "../../components/CreateProjectModal";
import api from "../../lib/axios";
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {
    try {
      const [statsRes, projectsRes, clientsRes, teamRes] = await Promise.all([
        api.get("/dashboard/admin"),
        api.get("/projects"),
        api.get("/auth/users?role=CLIENT"),
        api.get("/auth/users?role=TEAM"),
      ]);
      setStats(statsRes.data);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
      setTeamMembers(teamRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
        await api.post("/projects", projectData);
        fetchData(); // Refresh list
        setIsModalOpen(false);
    } catch (error) {
        console.error("Failed to create project", error);
        alert("Failed to create project: " + (error.response?.data?.message || error.message));
    }
  };


  if (loading) {
      return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading Dashboard...</div>
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24">
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of all system activity</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-blue-600/20 transition-all"
            >
                <Plus size={20} />
                New Project
            </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard title="Total Projects" value={stats?.totalProjects || 0} icon={LayoutDashboard} color="blue" delay={0} />
            <StatsCard title="Completed" value={stats?.completedProjects || 0} icon={CheckCircle2} color="green" delay={0.1} />
            <StatsCard title="Active" value={stats?.activeProjects || 0} icon={Clock} color="purple" delay={0.2} />
            <StatsCard title="Delayed" value={stats?.delayedProjects || 0} icon={AlertCircle} color="red" delay={0.3} />
        </div>

        {/* Projects List */}
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
        </div>
        
        {projects.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400">No projects found. Create one to get started.</p>
            </div>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={project._id} project={project} index={index} />
                ))}
            </div>
        )}
      </main>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateProject}
        clients={clients}
        teamMembers={teamMembers}
      />

    </div>
  );
};

export default AdminDashboard;
