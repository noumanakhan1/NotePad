import { Plus, Download, Upload, Trash, Search } from "lucide-react";

const Toolbar = ({
  searchTerm,
  setSearchTerm,
  setIsCreating,
  exportNotes,
  importNotes,
  clearAllNotes,
}) => (
  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
    <div className="relative flex-1 max-w-md">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus size={20} /> Add Note
      </button>
      <button
        onClick={exportNotes}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <Download size={16} /> Export
      </button>
      <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
        <Upload size={16} /> Import
        <input
          type="file"
          accept=".json"
          onChange={importNotes}
          className="hidden"
        />
      </label>
      <button
        onClick={clearAllNotes}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <Trash size={16} /> Clear All
      </button>
    </div>
  </div>
);

export default Toolbar;
