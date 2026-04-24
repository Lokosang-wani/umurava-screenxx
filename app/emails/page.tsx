'use client';

import { Mail, ShieldCheck, User, Search, Filter, ArrowLeft, ExternalLink, Bot, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import clsx from 'clsx';

export default function EmailLogsPage() {
  const [emails, setEmails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await api.get('/emails');
        setEmails(response.data.data.emails);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter(email => 
    email.recipient_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link href="/dashboard" className="hover:text-[#0B1B42] transition-colors">Dashboard</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#0B1B42] font-bold">Communications</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">Email Communications</h1>
          <p className="text-gray-500 mt-2">Audit trail of all human and AI-automated system emails.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search recipients or subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recipient</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sent By</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  Loading communications...
                </td>
              </tr>
            ) : filteredEmails.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  No sent emails found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredEmails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-[#0B1B42]">{email.recipient_email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{email.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    {email.sent_by_ai ? (
                      <div className="flex items-center space-x-2 text-indigo-600">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">ScreenerX AI</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">{email.user?.full_name || 'System User'}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-800">{new Date(email.created_at).toLocaleDateString()}</span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(email.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Integration Banner */}
      <div className="bg-gradient-to-r from-[#0B1B42] to-blue-900 rounded-2xl p-8 text-white shadow-xl flex items-center justify-between">
        <div className="flex items-start space-x-5">
          <div className="p-3 bg-white/10 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">System Integrity & Audit</h3>
            <p className="text-blue-200 text-sm mt-1 max-w-md">Every email sent via ScreenerX is cryptographically signed and logged for compliance and operational transparency.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-[#0B1B42] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all whitespace-nowrap">
          Download Compliance PDF
        </button>
      </div>
    </div>
  );
}
