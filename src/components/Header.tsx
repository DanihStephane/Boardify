import { Bell, Search, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une tâche..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings size={20} />
          </button>
          <div className="h-8 w-px bg-gray-200" />
          <button className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg px-3 py-2">
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}