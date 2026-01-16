import React from "react";
import { MessageSquare, Send } from "lucide-react";

const ProjectNotes = ({
  notes = [],
  noteContent,
  sendingNote,
  noteError,
  onNoteChange,
  onSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MessageSquare size={20} className="text-blue-500" /> Project Notes
      </h3>

      <form onSubmit={onSubmit} className="mb-8 relative">
        <textarea
          value={noteContent}
          onChange={(event) => onNoteChange(event.target.value)}
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

      {noteError && (
        <p className="text-sm text-red-500 mb-4" role="alert">
          {noteError}
        </p>
      )}

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No notes yet. Start the conversation!
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-white/5"
            >
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
  );
};

export default ProjectNotes;
