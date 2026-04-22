'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, ClipboardCheck, Plus, HelpCircle, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Applicants', href: '/applicants', icon: Users },
  { name: 'Shortlist', href: '/shortlist', icon: ClipboardCheck },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#F8FAFC] border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-[#0B1B42] font-bold text-xl tracking-tight">
          ScreenerX <span className="text-[#2563EB]">AI</span>
        </h1>
        <p className="text-gray-500 text-xs mt-1">Recruitment Suite</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon
                className={clsx('w-5 h-5', isActive ? 'text-blue-700' : 'text-gray-400')}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-4">
        <Link
          href="/jobs/create"
          className="flex items-center justify-center w-full bg-[#0B1B42] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Job
        </Link>
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <HelpCircle className="w-5 h-5 mr-3 text-gray-400" />
          Help Center
        </button>
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <LogOut className="w-5 h-5 mr-3 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
