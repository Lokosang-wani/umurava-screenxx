import NoData from '@/components/shared/NoData';
import { Activity, Search, Filter, Download, ArrowLeft, ShieldCheck, Database, FileText, CheckCircle2, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function AuditLogPage() {
  const auditLogs = [
    { id: 1, action: 'AI Screening Completed', resource: 'Job: Senior AI Engineer', user: 'System (ScreenerX AI)', date: 'Oct 24, 2026 - 14:32:01', status: 'Success', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 2, action: 'Batch Resume Upload', resource: 'Talent Pool (42 resumes)', user: 'Alex Thompson', date: 'Oct 24, 2026 - 11:15:44', status: 'Success', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, action: 'Job Settings Updated', resource: 'Job: Product Designer', user: 'Alex Thompson', date: 'Oct 23, 2026 - 09:05:12', status: 'Success', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 4, action: 'Candidate Rejected', resource: 'Applicant: Jordan Lee', user: 'System (Auto-Reject)', date: 'Oct 23, 2026 - 08:30:00', status: 'Success', icon: FileText, color: 'text-gray-500', bg: 'bg-gray-100' },
    { id: 5, action: 'AI Bias Filter Triggered', resource: 'Applicant: Maya Patel', user: 'System (ScreenerX AI)', date: 'Oct 22, 2026 - 16:45:22', status: 'Flagged', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4 text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Full Audit Log</h1>
          <p className="text-gray-500 mt-2">Comprehensive trail of AI decisions and system activities.</p>
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
              placeholder="Search logs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-bold">Action</th>
                <th className="p-4 font-bold">Resource</th>
                <th className="p-4 font-bold">User / Actor</th>
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <NoData 
                      icon={ClipboardList}
                      title="No activity recorded"
                      description="There are no audit logs available for your organization yet. Activities will appear here as you use the platform."
                    />
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${log.bg} ${log.color}`}>
                          <log.icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#0B1B42]">{log.action}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{log.resource}</td>
                    <td className="p-4 text-sm text-gray-700">{log.user}</td>
                    <td className="p-4 text-sm text-gray-500">{log.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
