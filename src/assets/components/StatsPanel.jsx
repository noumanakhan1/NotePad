import { Database } from "lucide-react";
import { formatBytes } from "../utils/helpers";

const StatsPanel = ({ notes, filteredNotes, storageInfo }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="text-2xl font-bold text-blue-600">{notes.length}</div>
      <div className="text-gray-600 text-sm">Total Notes</div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="text-2xl font-bold text-green-600">
        {filteredNotes.length}
      </div>
      <div className="text-gray-600 text-sm">Filtered Results</div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="text-2xl font-bold text-purple-600">
        {new Set(notes.map((n) => n.category)).size}
      </div>
      <div className="text-gray-600 text-sm">Categories</div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-1">
        <Database size={16} className="text-orange-600" />
        <div className="text-lg font-bold text-orange-600">
          {formatBytes(storageInfo.used)}
        </div>
      </div>
      <div className="text-gray-600 text-xs">
        Storage Used • Last saved: {storageInfo.lastSaved || "Never"}
      </div>
    </div>
  </div>
);

export default StatsPanel;
