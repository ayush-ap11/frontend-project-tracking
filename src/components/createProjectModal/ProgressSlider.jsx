import React from "react";

const ProgressSlider = ({ value, onChange }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Progress (Timeline)
        </label>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {value || 0}%
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value || 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
      />
    </div>
  );
};

export default ProgressSlider;
