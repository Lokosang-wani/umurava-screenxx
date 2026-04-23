'use client';
import { Bell, Settings, Search, ChevronDown, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Header() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <header className="h-20 border-b border-gray-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search candidates, jobs, or analytics..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 pr-4 border-r border-gray-100">
          <Link href="/notifications" className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 transition-all relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </Link>
          <Link href="/settings" className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
            <Settings className="h-5 w-5" />
          </Link>
        </div>

        <Link href="/settings" className="flex items-center space-x-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#0B1B42]">
            <UserIcon className="w-5 h-5" />
          </div>
          <div className="text-left hidden lg:block">
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-2 w-12 bg-gray-100 animate-pulse rounded"></div>
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-[#0B1B42] leading-none">
                  {user?.full_name || 'Admin User'}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  {user?.role || 'HR Manager'}
                </p>
              </>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
