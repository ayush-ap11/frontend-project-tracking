import React from "react";
import { Plus } from "lucide-react";

const DashboardHeader = ({ onNewProject }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of all system activity and projects</p>
      </div>
      <button 
        onClick={onNewProject}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
      >
        <Plus size={20} />
        <span>New Project</span>
      </button>
    </header>
  );
};

export default DashboardHeader;
