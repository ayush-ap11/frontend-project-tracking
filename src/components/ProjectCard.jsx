import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Edit2, Clock } from "lucide-react";

const ProjectCard = ({ project, index = 0, onEdit }) => {
  const statusColors = {
    "PLANNED": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    "ACTIVE": "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    "ON_TRACK": "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    "DELAYED": "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800",
    "COMPLETED": "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800",
    "ON_HOLD": "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 h-full"
    >
      {/* Top Status & Date */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
            <Calendar size={14} className="text-gray-400" />
            <span>{new Date(project.expectedEndDate || project.deadline).toLocaleDateString()}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[project.status] || statusColors["PLANNED"]}`}>
          {project.status.replace("_", " ")}
        </span>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2">
          {project.name || project.projectName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Footer: Team & Actions */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
             <div className="flex -space-x-3">
                {project.teamMembers && project.teamMembers.length > 0 ? (
                        project.teamMembers.slice(0, 4).map((member, i) => (
                        <div key={i} title={member.name || "Member"} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-white font-bold uppercase shadow-sm">
                            {(member.name || "U").charAt(0)}
                        </div>
                    ))
                ) : (
                    <span className="text-xs text-gray-400 italic pl-1">No team</span>
                )}
                {project.teamMembers && project.teamMembers.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-gray-600 dark:text-gray-300 font-bold shadow-sm">
                        +{project.teamMembers.length - 4}
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Link
                to={`/projects/${project._id}`}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors"
                title="View Details"
            >
                View Details
            </Link>
            
            {onEdit && (
                <button
                    onClick={() => onEdit(project)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-600 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Edit2 size={14} />
                    <span>Update</span>
                </button>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
