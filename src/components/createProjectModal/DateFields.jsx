import React from "react";

const DateFields = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Start Date
        </label>
        <input
          type="date"
          required
          value={formData.startDate}
          onChange={(event) => onChange("startDate", event.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Expected End Date
        </label>
        <input
          type="date"
          required
          value={formData.expectedEndDate}
          onChange={(event) => onChange("expectedEndDate", event.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
        />
      </div>
    </div>
  );
};

export default DateFields;
