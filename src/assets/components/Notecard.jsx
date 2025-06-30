import { useState } from "react";
import { Edit3, Trash2, Save, X, Calendar } from "lucide-react";
import { formatDate } from "../utils/helpers";

const NoteCard = ({ note, updateNote, deleteNote, categories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: note.title,
    content: note.content,
    category: note.category,
  });

  const handleSave = () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      alert("Please fill in both title and content fields.");
      return;
    }
    const success = updateNote(note.id, editForm);
    if (success !== false) setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: note.title,
      content: note.content,
      category: note.category,
    });
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="space-y-4">
        <input
          type="text"
          value={editForm.title}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full text-xl font-semibold border-b-2 border-blue-500 focus:outline-none bg-transparent"
          placeholder="Note title..."
        />

        <select
          value={editForm.category}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, category: e.target.value }))
          }
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          value={editForm.content}
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, content: e.target.value }))
          }
          className="w-full h-32 resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your note here..."
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!editForm.title.trim() || !editForm.content.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} /> Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">
          {note.title}
        </h3>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit note"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {note.category}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Calendar size={12} /> {formatDate(note.updatedAt)}
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;
