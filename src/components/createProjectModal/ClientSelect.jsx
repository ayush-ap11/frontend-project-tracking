import React from "react";

const ClientSelect = ({ clients, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Assign Client
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
      >
        <option value="">Select a Client</option>
        {clients.map((client) => (
          <option key={client._id} value={client._id}>
            {client.name} ({client.email})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientSelect;
