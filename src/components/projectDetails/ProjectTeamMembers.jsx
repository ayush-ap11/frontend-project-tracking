import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const ProjectTeamMembers = ({ teamMembers = [], canNavigate = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <User size={20} className="text-purple-500" /> Team Members
      </h3>
      <div className="flex flex-wrap gap-4">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => {
            const key = member._id || member;
            const cardClasses =
              "flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-white/5 hover:border-blue-400/40 dark:hover:border-blue-400/40 transition-colors";
            const cardContent = (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {(member.name || "User").charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {member.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                    {member.role}
                  </p>
                </div>
              </>
            );

            if (member._id && canNavigate) {
              return (
                <Link
                  key={key}
                  to={`/users/${member._id}`}
                  state={{ user: member }}
                  className={cardClasses}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={key} className={cardClasses}>
                {cardContent}
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 italic">No team members visible.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectTeamMembers;
