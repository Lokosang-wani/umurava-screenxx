'use client';
import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, Download, CheckCircle2, AlertTriangle, Briefcase, GraduationCap, Link as LinkIcon, Calendar, X, Clock, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CandidateProfilePage() {
  const params = useParams();
  const applicantId = params.applicantId as string;
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setIsScheduleModalOpen(false);
      setScheduleSuccess(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      {/* Top Navigation & Actions */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/applicants" className="mr-4 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-[#0B1B42] text-white rounded-full flex items-center justify-center font-bold text-lg">A</div>
             <div>
               <h1 className="text-xl font-bold text-[#0B1B42]">Dr. Aris Thorne</h1>
               <p className="text-xs text-gray-500 mt-0.5">Senior ML Infrastructure Engineer @ DeepMind</p>
             </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors shadow-sm">
             Reject
          </button>
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" /> Schedule Interview
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI Assessment */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">ScreenerX AI Match</h2>
                <span className="text-3xl font-light text-green-500">98%</span>
             </div>

             <div className="space-y-6">
               <div>
                 <span className="flex items-center text-[10px] font-bold text-green-600 tracking-wider uppercase mb-3">
                   <CheckCircle2 className="w-4 h-4 mr-1" /> Core Strengths
                 </span>
                 <ul className="space-y-3">
                   <li className="text-sm text-gray-700 bg-green-50/50 p-2 rounded border border-green-100">
                     Pioneered scaling protocols for GPT-3 production environments.
                   </li>
                   <li className="text-sm text-gray-700 bg-green-50/50 p-2 rounded border border-green-100">
                     Expertise in high-throughput low-latency inference.
                   </li>
                   <li className="text-sm text-gray-700 bg-green-50/50 p-2 rounded border border-green-100">
                     Direct experience with requested tech stack: Python, PyTorch, Kubernetes.
                   </li>
                 </ul>
               </div>

               <div>
                 <span className="flex items-center text-[10px] font-bold text-amber-600 tracking-wider uppercase mb-3">
                   <AlertTriangle className="w-4 h-4 mr-1" /> Potential Gaps
                 </span>
                 <ul className="space-y-3">
                   <li className="text-sm text-gray-700 bg-amber-50/50 p-2 rounded border border-amber-100">
                     Limited experience in customer-facing product management.
                   </li>
                 </ul>
               </div>

               <div className="pt-4 border-t border-gray-100">
                 <p className="text-xs text-indigo-800 italic bg-indigo-50 p-3 rounded-lg border border-indigo-100 leading-relaxed">
                   "Highly recommended for core architectural leadership. Matches 10/10 of your non-negotiables for the Senior AI Engineer role."
                 </p>
               </div>
             </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Contact & Links</h2>
             <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" /> aris.t@example.com
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" /> +1 (555) 019-2834
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3" /> San Francisco, CA (Remote)
                </div>
                <div className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer pt-2">
                  <LinkIcon className="w-4 h-4 mr-3" /> linkedin.com/in/aristhorne
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Parsed Resume */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
               <h2 className="text-xl font-bold text-[#0B1B42]">Parsed Resume Data</h2>
               <button className="text-sm font-medium text-blue-600 flex items-center hover:underline">
                 <Download className="w-4 h-4 mr-1" /> View Original PDF
               </button>
            </div>

            <div className="space-y-8">
               {/* Experience */}
               <div>
                 <div className="flex items-center space-x-2 text-[#0B1B42] font-bold mb-4">
                   <Briefcase className="w-5 h-5 text-blue-600" />
                   <span>Experience</span>
                 </div>
                 
                 <div className="space-y-6 pl-2 border-l-2 border-blue-100 ml-2">
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                      <h3 className="font-bold text-[#0B1B42]">Senior ML Infrastructure Engineer</h3>
                      <p className="text-sm text-gray-500 font-medium">DeepMind • 2021 - Present</p>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                        Led a team of 5 engineers to scale distributed training infrastructure for LLMs. Reduced model training time by 40% using custom PyTorch optimizations and Kubernetes scaling logic.
                      </p>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                      <h3 className="font-bold text-[#0B1B42]">Research Engineer</h3>
                      <p className="text-sm text-gray-500 font-medium">OpenAI • 2018 - 2021</p>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                        Developed data pipeline architecture for early GPT models. Contributed to core inference optimization libraries.
                      </p>
                    </div>
                 </div>
               </div>

               {/* Education */}
               <div>
                 <div className="flex items-center space-x-2 text-[#0B1B42] font-bold mb-4">
                   <GraduationCap className="w-5 h-5 text-blue-600" />
                   <span>Education</span>
                 </div>
                 
                 <div className="space-y-4 pl-2 border-l-2 border-blue-100 ml-2">
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                      <h3 className="font-bold text-[#0B1B42]">Ph.D. Computer Science</h3>
                      <p className="text-sm text-gray-500 font-medium">Stanford University • 2014 - 2018</p>
                      <p className="text-sm text-gray-700 mt-1">Focus on Distributed Systems and Machine Learning.</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Schedule Interview Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#0B1B42]">Schedule Interview</h2>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {scheduleSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                   <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-[#0B1B42] mb-2">Invitation Sent!</h3>
                 <p className="text-sm text-gray-500">Dr. Aris Thorne has been notified and sent a calendar invite link.</p>
              </div>
            ) : (
              <form onSubmit={handleSchedule} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Interview Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Technical Screen (45m)</option>
                    <option>Initial Culture Fit (30m)</option>
                    <option>System Design (60m)</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input type="date" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input type="time" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Interviewers</label>
                  <input type="text" defaultValue="Alex Thompson, Sarah Jenkins" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Meeting URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Video className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      placeholder="https://meet.google.com/xxx-xxxx-xxx" 
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Message to Candidate</label>
                  <textarea 
                    rows={3} 
                    defaultValue="Hi Aris, we were really impressed by your background in scaling LLM infrastructure and would love to chat further." 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
