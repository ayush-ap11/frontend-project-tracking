import React from "react";
import { Plus, X } from "lucide-react";

const TeamMembersSection = ({
  selectedMembers,
  teamMembers,
  availableMembers,
  onAddMember,
  onRemoveMember,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Assign Team Members
      </label>

      <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-2 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10">
        {selectedMembers.length === 0 && (
          <span className="text-gray-400 text-sm p-1">
            No members assigned yet.
          </span>
        )}
        {selectedMembers.map((memberId) => {
          const member = teamMembers.find((item) => item._id === memberId);

          return (
            <div
              key={memberId}
              className="group relative flex items-center gap-2 pl-3 pr-8 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
            >
              <span>{member?.name || "Unknown"}</span>
              <button
                type="button"
                onClick={() => onRemoveMember(memberId)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {availableMembers.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
            Available Members
          </p>
          <div className="grid grid-cols-2 gap-2">
            {availableMembers.map((member) => (
              <button
                key={member._id}
                type="button"
                onClick={() => onAddMember(member._id)}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {member.email}
                  </p>
                </div>
                <div className="p-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                  <Plus size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembersSection;
