import React from "react";
import { Clock } from "lucide-react";

const ProjectActivityLog = ({ activities = [] }) => {
  const timeline = Array.isArray(activities) ? activities : [];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 h-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock size={20} className="text-orange-500" /> Activity Log
      </h3>

      <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-2">
        {timeline.length === 0 ? (
          <p className="text-gray-400 italic text-sm">
            No activity recorded yet.
          </p>
        ) : (
          timeline.map((log, index) => (
            <div key={log._id || index} className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600 ring-4 ring-white dark:ring-gray-800" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {log.action.replace("_", " ")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  by
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {` ${log.userId?.name || "System"}`}
                  </span>
                  {` • ${new Date(log.createdAt).toLocaleDateString()}`}
                </p>
                {log.details && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                    {log.details}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectActivityLog;
