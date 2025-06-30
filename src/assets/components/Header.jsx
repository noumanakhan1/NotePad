import { FileText } from "lucide-react";

const Header = () => (
  <div className="flex items-center gap-3 mb-4">
    <FileText className="text-blue-600" size={32} />
    <h1 className="text-3xl font-bold text-gray-800">Professional Notepad</h1>
    <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
      localStorage Enabled
    </span>
  </div>
);

export default Header;
