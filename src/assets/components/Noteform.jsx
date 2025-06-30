import { Save, X } from "lucide-react";

const NoteForm = ({
  newNote,
  setNewNote,
  createNote,
  setIsCreating,
  categories,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">
      Create New Note
    </h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Note title..."
        value={newNote.title}
        onChange={(e) =>
          setNewNote((prev) => ({ ...prev, title: e.target.value }))
        }
        className="w-full text-xl font-semibold border-b-2 border-blue-500 focus:outline-none bg-transparent pb-2"
      />

      <select
        value={newNote.category}
        onChange={(e) =>
          setNewNote((prev) => ({ ...prev, category: e.target.value }))
        }
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your note here..."
        value={newNote.content}
        onChange={(e) =>
          setNewNote((prev) => ({ ...prev, content: e.target.value }))
        }
        className="w-full h-32 resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          onClick={createNote}
          disabled={!newNote.title.trim() || !newNote.content.trim()}
          className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Save size={16} /> Create Note
        </button>
        <button
          onClick={() => {
            setIsCreating(false);
            setNewNote({ title: "", content: "", category: "General" });
          }}
          className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          <X size={16} /> Cancel
        </button>
      </div>

      <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
        💡 Your note will be automatically saved and persist even after
        refreshing the page!
      </div>
    </div>
  </div>
);

export default NoteForm;
