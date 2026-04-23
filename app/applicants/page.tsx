import { Search, Filter, Download, MoreHorizontal, User, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function ApplicantsPoolPage() {
  const applicants = [
    { id: '1', name: 'Dr. Aris Thorne', email: 'aris.t@example.com', role: 'Senior ML Infrastructure Engineer', score: 98, status: 'Shortlisted' },
    { id: '2', name: 'Elena Volkov', email: 'elena.v@example.com', role: 'Lead AI Researcher', score: 94, status: 'Interviewing' },
    { id: '3', name: 'Samuel Zhang', email: 'samuel.z@example.com', role: 'MLOps Architect', score: 91, status: 'New' },
    { id: '4', name: 'Maya Patel', email: 'maya.p@example.com', role: 'Data Scientist', score: 85, status: 'New' },
    { id: '5', name: 'Jordan Lee', email: 'jordan.l@example.com', role: 'Frontend Developer', score: 45, status: 'Rejected' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Talent Pool</h1>
          <p className="text-gray-500 mt-2">Browse and manage all applicants across your organization.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/applicants/ingest" className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Import Candidates
          </Link>
          <button className="flex items-center px-4 py-2 bg-[#0B1B42] text-white border border-transparent rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 rounded-t-xl">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-bold">Candidate Name</th>
                <th className="p-4 font-bold">Applied Role</th>
                <th className="p-4 font-bold">Match Score</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/applicants/${app.id}`} className="font-bold text-[#0B1B42] hover:text-blue-600 hover:underline">
                          {app.name}
                        </Link>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3 mr-1" />
                          {app.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{app.role}</td>
                  <td className="p-4">
                    <span className={clsx(
                      "font-bold text-sm",
                      app.score >= 90 ? "text-green-600" : app.score >= 70 ? "text-blue-600" : "text-red-500"
                    )}>
                      {app.score}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider",
                      app.status === 'Shortlisted' ? "bg-green-100 text-green-800" :
                      app.status === 'Interviewing' ? "bg-purple-100 text-purple-800" :
                      app.status === 'Rejected' ? "bg-red-100 text-red-800" :
                      "bg-blue-50 text-blue-700"
                    )}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/applicants/${app.id}`} className="inline-flex items-center p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
