import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, UserPlus, Trash2 } from "lucide-react";

const CreateProjectModal = ({ isOpen, onClose, onSubmit, clients = [], teamMembers = [] }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    status: "NOT_STARTED", // Default as per model
    startDate: new Date().toISOString().split('T')[0],
    expectedEndDate: "",
    clientId: "",
    teamMembers: [], // Array of IDs
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.clientId) {
        alert("Please assign a client.");
        return;
    }
    onSubmit(formData);
    // Reset form
    setFormData({
        projectName: "",
        description: "",
        status: "NOT_STARTED",
        startDate: new Date().toISOString().split('T')[0],
        expectedEndDate: "",
        clientId: "",
        teamMembers: [],
    });
  };

  const addTeamMember = (memberId) => {
    if (!formData.teamMembers.includes(memberId)) {
        setFormData({
            ...formData,
            teamMembers: [...formData.teamMembers, memberId]
        });
    }
  };

  const removeTeamMember = (memberId) => {
    setFormData({
        ...formData,
        teamMembers: formData.teamMembers.filter(id => id !== memberId)
    });
  };

  // Filter available members (not yet selected)
  const availableMembers = teamMembers.filter(m => !formData.teamMembers.includes(m._id));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
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

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Project</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details to kickstart a new initiative.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Name</label>
                    <input
                        type="text"
                        required
                        value={formData.projectName}
                        onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                        placeholder="e.g. Mobile App Development"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                    >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="ON_TRACK">On Track</option>
                        <option value="DELAYED">Delayed</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white resize-none h-32 transition-all"
                    placeholder="Describe the project scope..."
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                    <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expected End Date</label>
                    <input
                        type="date"
                        required
                        value={formData.expectedEndDate}
                        onChange={(e) => setFormData({...formData, expectedEndDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                    />
                </div>
            </div>

            {/* Client Assignment */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assign Client</label>
                <select
                    value={formData.clientId}
                    onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                >
                    <option value="">Select a Client</option>
                    {clients.map(client => (
                        <option key={client._id} value={client._id}>{client.name} ({client.email})</option>
                    ))}
                </select>
            </div>

            {/* Team Members Assignment */}
            <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Assign Team Members</label>
                 
                 {/* Assigned List */}
                 <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-2 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10">
                     {formData.teamMembers.length === 0 && <span className="text-gray-400 text-sm p-1">No members assigned yet.</span>}
                     {formData.teamMembers.map(memberId => {
                         const member = teamMembers.find(m => m._id === memberId);
                         return (
                             <div key={memberId} className="group relative flex items-center gap-2 pl-3 pr-8 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                                 <span>{member?.name}</span>
                                 <button
                                    type="button"
                                    onClick={() => removeTeamMember(memberId)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                     <X size={12} />
                                 </button>
                             </div>
                         )
                     })}
                 </div>

                 {/* Available List */}
                 {availableMembers.length > 0 && (
                     <div className="space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Available Members</p>
                        <div className="grid grid-cols-2 gap-2">
                            {availableMembers.map(member => (
                                <button
                                    key={member._id}
                                    type="button"
                                    onClick={() => addTeamMember(member._id)}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{member.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">{member.email}</p>
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
                className="px-8 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-600/20 transition-all font-semibold"
              >
                Create Project
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateProjectModal;
