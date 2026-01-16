import React from "react";
import { Calendar } from "lucide-react";

const ProjectHeader = ({ project }) => {
  const projectName = project.name || project.projectName;
  const endDate = project.expectedEndDate
    ? new Date(project.expectedEndDate).toLocaleDateString()
    : "";
  const progressValue = project.progress || 0;
  const statusLabel = project.status.replace("_", " ");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {projectName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wide">
            {statusLabel}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} />
            <span>Due: {endDate}</span>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Project Progress
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {progressValue}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
