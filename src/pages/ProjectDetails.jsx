import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import { ArrowLeft, Send, Clock, User, MessageSquare, Briefcase, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Note Form
  const [noteContent, setNoteContent] = useState("");
  const [sendingNote, setSendingNote] = useState(false);

  const fetchData = async () => {
    try {
      const [projRes, notesRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/note`)
      ]);
      setProject(projRes.data);
      setNotes(notesRes.data);

      try {
           const actRes = await api.get(`/projects/${id}/activity`);
           setActivities(actRes.data);
      } catch (err) {
           // Ignored if user not authorized for activity
           console.log("Activity logs not accessible or error", err);
      }
      
    } catch (error) {
      console.error("Failed to load project details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    
    setSendingNote(true);
    try {
        await api.post(`/projects/${id}/note`, { content: noteContent });
        setNoteContent("");
        // Refresh notes
        const freshNotes = await api.get(`/projects/${id}/note`);
        setNotes(freshNotes.data);
    } catch (error) {
        console.error("Failed to add note", error);
        alert("Failed to add note");
    } finally {
        setSendingNote(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  if (!project) {
     return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 text-center">
            <h2 className="text-2xl font-bold dark:text-white">Project Not Found</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 hover:underline">Go Back</button>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 pt-24 pb-20">
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
            <ArrowLeft size={20} /> Back
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.name || project.projectName}</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{project.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wide">
                        {project.status.replace("_", " ")}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>Due: {new Date(project.expectedEndDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Project Progress</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{project.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${project.progress || 0}%` }}
                    />
                </div>
            </div>
        </div>

        {/* Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details & Stages */}
            <div className="lg:col-span-2 space-y-8">
                {/* Team Section - Hide for Client if strict, but usually visible. Keeping it safe with check */}
                {project.teamMembers && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User size={20} className="text-purple-500" /> Team Members
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {project.teamMembers.length > 0 ? (
                            project.teamMembers.map((member) => (
                                <div key={member._id || member} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                        {(member.name || "U").charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{member.name || "User"}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{member.role}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">No team members visible.</p>
                        )}
                    </div>
                </div>
                )}
                
                {/* Notes Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <MessageSquare size={20} className="text-blue-500" /> Project Notes
                    </h3>
                    
                    {/* Add Note */}
                    <form onSubmit={handleAddNote} className="mb-8 relative">
                        <textarea
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            placeholder="Add a new note..."
                            className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white min-h-[100px] resize-none"
                        />
                        <button
                            type="submit"
                            disabled={sendingNote || !noteContent.trim()}
                            className="absolute bottom-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </form>

                    {/* Notes List */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {notes.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">No notes yet. Start the conversation!</div>
                        ) : (
                            notes.map((note) => (
                                <div key={note._id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {note.createdBy?.name || "Unknown User"}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 uppercase">
                                                {note.createdBy?.role}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(note.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                                        {note.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Activity Log */}
            <div className="space-y-8">
                 <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-orange-500" /> Activity Log
                    </h3>
                    
                    <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-2">
                        {activities.length === 0 ? (
                            <p className="text-gray-400 italic text-sm">No activity recorded yet.</p>
                        ) : (
                            activities.map((log, index) => (
                                <div key={log._id || index} className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600 ring-4 ring-white dark:ring-gray-800" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                            {log.action.replace("_", " ")}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            by <span className="font-medium text-gray-700 dark:text-gray-300">{log.userId?.name || "System"}</span> • {new Date(log.createdAt).toLocaleDateString()}
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
            </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
