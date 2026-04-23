'use client';
import { useParams } from 'next/navigation';
import { ArrowLeft, Users, CheckCircle, Clock, Settings, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/jobs" className="mr-4 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-[#0B1B42]">Senior AI Engineer</h1>
              <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase tracking-wider">Active</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Tech & Infrastructure • Remote</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link href={`/jobs/${jobId}/settings`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center">
             <Settings className="w-4 h-4 mr-2" /> Settings
          </Link>
          <Link href={`/jobs/${jobId}/edit`} className="px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
            Edit Job
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 space-y-8">
        
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 text-blue-600 mb-2">
              <Users className="w-5 h-5" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Pipeline</h3>
            </div>
            <p className="text-3xl font-light text-[#0B1B42]">428</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 text-green-600 mb-2">
              <CheckCircle className="w-5 h-5" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Shortlisted</h3>
            </div>
            <p className="text-3xl font-light text-[#0B1B42]">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 text-purple-600 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Interviewing</h3>
            </div>
            <p className="text-3xl font-light text-[#0B1B42]">4</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3 text-amber-600 mb-2">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Time Open</h3>
            </div>
            <p className="text-3xl font-light text-[#0B1B42]">14 Days</p>
          </div>
        </div>

        {/* Content Tabs (Mocked as sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#0B1B42]">Top AI Matches</h2>
              <Link href="/shortlist" className="text-sm font-medium text-blue-600 hover:underline">View Full Shortlist Analysis</Link>
            </div>
            
            {/* Mini Pipeline View */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
               <div className="divide-y divide-gray-100">
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-[#0B1B42] text-white rounded-lg flex items-center justify-center font-bold">1</div>
                     <div>
                       <Link href="/applicants/1" className="font-bold text-[#0B1B42] hover:text-blue-600">Dr. Aris Thorne</Link>
                       <p className="text-xs text-gray-500">Senior ML Infrastructure Engineer</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-2xl font-light text-green-500">98%</p>
                   </div>
                 </div>
                 <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center font-bold">2</div>
                     <div>
                       <Link href="/applicants/2" className="font-bold text-[#0B1B42] hover:text-blue-600">Elena Volkov</Link>
                       <p className="text-xs text-gray-500">Lead AI Researcher</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-2xl font-light text-green-500">94%</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#0B1B42] mb-4">Job Requirements</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Remote</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">Technical Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Python</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">PyTorch</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">LLMs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
