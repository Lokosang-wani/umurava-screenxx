import { Plus, Briefcase, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Jobs</h1>
          <p className="text-gray-500 mt-2">Manage your active job postings and candidate pipelines.</p>
        </div>
        <Link href="/jobs/create" className="flex items-center px-4 py-2 bg-[#0B1B42] text-white border border-transparent rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create New Job
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
           <h2 className="text-lg font-bold text-[#0B1B42]">Active Opportunities</h2>
           <span className="text-sm font-medium text-gray-500">2 Total Jobs</span>
        </div>
        
        <div className="divide-y divide-gray-100">
           {/* Job Item 1 */}
           <div className="p-6 hover:bg-blue-50 transition-colors flex items-center justify-between group">
             <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                 <Briefcase className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-[#0B1B42] text-lg">Senior AI Engineer</h3>
                 <p className="text-sm text-gray-500 mt-1">Tech & Infrastructure • Remote</p>
                 <div className="flex items-center space-x-2 mt-2">
                   <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-800 uppercase tracking-wider">High Priority</span>
                   <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-wider">24 Applicants</span>
                 </div>
               </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Top Match</p>
                  <p className="text-xl font-light text-green-500">92%</p>
                </div>
                <Link href="/shortlist" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm">
                  <ChevronRight className="w-5 h-5" />
                </Link>
             </div>
           </div>

           {/* Job Item 2 */}
           <div className="p-6 hover:bg-blue-50 transition-colors flex items-center justify-between group">
             <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                 <Briefcase className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-[#0B1B42] text-lg">Product Designer</h3>
                 <p className="text-sm text-gray-500 mt-1">User Experience • Kigali, RW</p>
                 <div className="flex items-center space-x-2 mt-2">
                   <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-wider">Regular</span>
                   <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-wider">8 Applicants</span>
                 </div>
               </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Top Match</p>
                  <p className="text-xl font-light text-green-500">78%</p>
                </div>
                <Link href="/shortlist" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm">
                  <ChevronRight className="w-5 h-5" />
                </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
