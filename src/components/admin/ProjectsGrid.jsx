import React from "react";
import ProjectCard from "../ProjectCard";

const ProjectsGrid = ({ projects, onEdit }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-white/50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
        <p className="text-gray-500 dark:text-gray-400">No projects found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div>
       <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
             {/* Optional: Add Filter/Sort controls here later */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <ProjectCard 
                    key={project._id} 
                    project={project} 
                    index={index} 
                    onEdit={onEdit}
                />
            ))}
        </div>
    </div>
  );
};

export default ProjectsGrid;
