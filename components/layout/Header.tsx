import { Bell, Settings, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search applicants, jobs, or analytics..."
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-0 sm:text-sm transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link href="/notifications" className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
        <Link href="/settings" className="text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="h-5 w-5" />
        </Link>
        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300 cursor-pointer">
          {/* Using a placeholder avatar for now */}
          <div className="h-full w-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center">
             <span className="text-blue-800 font-medium text-xs">AT</span>
          </div>
        </div>
      </div>
    </header>
  );
}
