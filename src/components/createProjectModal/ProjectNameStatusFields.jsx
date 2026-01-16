import React from "react";

const ProjectNameStatusFields = ({ formData, onChange, isAdmin }) => {
  return (
    <div
      className={`grid grid-cols-1 ${isAdmin ? "md:grid-cols-2" : ""} gap-6`}
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Project Name
        </label>
        <input
          type="text"
          required
          value={formData.projectName}
          onChange={(event) => onChange("projectName", event.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
          placeholder="e.g. Mobile App Development"
        />
      </div>
      {isAdmin && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(event) => onChange("status", event.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_TRACK">On Track</option>
            <option value="DELAYED">Delayed</option>
            <option value="COMPLETED">Completed</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="PLANNED">Planned</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ProjectNameStatusFields;
