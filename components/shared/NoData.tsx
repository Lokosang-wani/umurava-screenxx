import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NoDataProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function NoData({ icon: Icon, title, description, actionLabel, actionHref }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-[#0B1B42]">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link 
          href={actionHref} 
          className="mt-6 px-6 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-all shadow-md shadow-blue-900/10"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
