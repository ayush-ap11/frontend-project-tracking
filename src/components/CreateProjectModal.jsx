import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useProjectForm from "../hooks/useProjectForm";
import ProjectNameStatusFields from "./createProjectModal/ProjectNameStatusFields";
import DescriptionField from "./createProjectModal/DescriptionField";
import ProgressSlider from "./createProjectModal/ProgressSlider";
import DateFields from "./createProjectModal/DateFields";
import ClientSelect from "./createProjectModal/ClientSelect";
import TeamMembersSection from "./createProjectModal/TeamMembersSection";

const CreateProjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  clients = [],
  teamMembers = [],
  initialData = null,
  isSubmitting = false,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const {
    formData,
    handleFieldChange,
    addTeamMember,
    removeTeamMember,
    submitForm,
    availableMembers,
    isEditMode,
  } = useProjectForm({ initialData, isAdmin, isOpen, onSubmit, teamMembers });

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <Motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isEditMode ? "Update Project" : "Create New Project"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {isEditMode
              ? "Update the project details below."
              : "Fill in the details to kickstart a new initiative."}
          </p>

          <form onSubmit={submitForm} className="space-y-6">
            <ProjectNameStatusFields
              formData={formData}
              onChange={handleFieldChange}
              isAdmin={isAdmin}
            />

            <DescriptionField
              value={formData.description}
              onChange={(value) => handleFieldChange("description", value)}
            />

            <ProgressSlider
              value={formData.progress}
              onChange={(value) => handleFieldChange("progress", value)}
            />

            {isAdmin && (
              <DateFields formData={formData} onChange={handleFieldChange} />
            )}

            {isAdmin && (
              <ClientSelect
                clients={clients}
                value={formData.clientId}
                onChange={(value) => handleFieldChange("clientId", value)}
              />
            )}

            {isAdmin && (
              <TeamMembersSection
                selectedMembers={formData.teamMembers}
                teamMembers={teamMembers}
                availableMembers={availableMembers}
                onAddMember={addTeamMember}
                onRemoveMember={removeTeamMember}
              />
            )}

            <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-600/20 transition-all font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : isEditMode ? (
                  "Update Project"
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </form>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateProjectModal;
