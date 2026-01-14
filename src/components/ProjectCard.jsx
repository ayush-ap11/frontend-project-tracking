import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Clock } from "lucide-react";

const ProjectCard = ({ project, index = 0 }) => {
  const statusColors = {
    "PLANNED": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    "ACTIVE": "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    "ON_TRACK": "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    "DELAYED": "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    "COMPLETED": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    "ON_HOLD": "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Top Right Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[project.status] || statusColors["PLANNED"]}`}>
          {project.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-2 pr-20"> {/* Padding right to avoid overlap with badge */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {project.name || project.projectName}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 min-h-[40px]">
          {project.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col gap-3">
         {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Calendar size={16} className="text-blue-500" />
          <span>Deadline: {new Date(project.expectedEndDate || project.deadline).toLocaleDateString()}</span>
        </div>
        
        {/* Team Members */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Users size={16} className="text-purple-500" />
                <div className="flex -space-x-2">
                    {project.teamMembers && project.teamMembers.length > 0 ? (
                         project.teamMembers.map((member, i) => (
                            <div key={i} title={member.name || "Member"} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-white font-bold uppercase">
                                {(member.name || "U").charAt(0)}
                            </div>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">No team assigned</span>
                    )}
                </div>
            </div>

             <Link
                to={`/projects/${project._id}`}
                className="opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
            >
                <ArrowRight size={20} />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
