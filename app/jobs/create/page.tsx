'use client';
import { ArrowLeft, Sparkles, CheckCircle2, ChevronDown, X, MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

export default function CreateJob() {
  const [techSkills, setTechSkills] = useState(['Python', 'PyTorch', 'LLMs']);
  const [softSkills, setSoftSkills] = useState(['Leadership', 'Critical Thinking']);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center sticky top-0 z-10">
        <Link href="/dashboard" className="mr-4 text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#0B1B42]">Create New Job</h1>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Form) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stepper */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between relative">
             <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gray-100 -z-0 -translate-y-1/2"></div>
             <Step number={1} label="Details" active={true} />
             <Step number={2} label="Requirements" active={false} />
             <Step number={3} label="Matching AI" active={false} />
             <Step number={4} label="Preview" active={false} />
          </div>

          {/* Form Sections */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-8">
             
             {/* Basic Information */}
             <div>
               <h2 className="text-lg font-bold text-[#0B1B42]">Basic Information</h2>
               <p className="text-sm text-gray-500 mb-6 mt-1">Define the core identity of the role</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Job Title</label>
                   <input type="text" placeholder="e.g. Senior Machine Learning Engineer" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Department</label>
                   <div className="relative">
                     <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                       <option>Engineering</option>
                       <option>Product</option>
                       <option>Design</option>
                     </select>
                     <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                   </div>
                 </div>
               </div>
               
               <div>
                 <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Role Description</label>
                 <textarea rows={4} placeholder="Briefly describe the mission of this role..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"></textarea>
               </div>
             </div>

             <div className="h-px bg-gray-100 w-full"></div>

             {/* Job Requirements */}
             <div>
               <h2 className="text-lg font-bold text-[#0B1B42] mb-6">Job Requirements</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Years of Experience</label>
                   <div className="flex items-center space-x-3">
                     <input type="number" defaultValue="5" className="w-20 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                     <span className="text-sm text-gray-500">years minimum</span>
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Work Location</label>
                   <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                     <button className="flex-1 py-1.5 text-sm font-medium bg-[#0B1B42] text-white rounded shadow-sm">Remote</button>
                     <button className="flex-1 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">Hybrid</button>
                     <button className="flex-1 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">On-site</button>
                   </div>
                 </div>
               </div>

               <div className="mb-6">
                 <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Technical Skills</label>
                 <div className="flex flex-wrap gap-2 mb-3">
                   {techSkills.map(skill => (
                     <span key={skill} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                       {skill}
                       <button className="ml-2 text-blue-400 hover:text-blue-600"><X className="w-3 h-3" /></button>
                     </span>
                   ))}
                 </div>
                 <input type="text" placeholder="Add a skill and press Enter..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
               </div>

               <div>
                 <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Soft Skills</label>
                 <div className="flex flex-wrap gap-2 mb-3">
                   {softSkills.map(skill => (
                     <span key={skill} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                       {skill}
                       <button className="ml-2 text-blue-400 hover:text-blue-600"><X className="w-3 h-3" /></button>
                     </span>
                   ))}
                 </div>
                 <input type="text" placeholder="Add soft skills..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
               </div>

             </div>

             {/* Footer Actions */}
             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                <button className="px-6 py-2.5 text-sm font-medium text-[#0B1B42] hover:bg-gray-50 rounded-lg transition-colors">Save Draft</button>
                <button className="px-6 py-2.5 text-sm font-medium bg-[#0B1B42] text-white rounded-lg hover:bg-blue-900 transition-colors shadow-sm">Continue to AI Setup</button>
             </div>
          </div>
        </div>

        {/* Right Column (AI Insights) */}
        <div className="space-y-6">
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Sparkles className="w-24 h-24" />
             </div>
             
             <div className="flex items-center space-x-2 text-[#0B1B42] font-bold text-lg mb-4">
               <Sparkles className="w-5 h-5 text-blue-600" />
               <span>Ideal Candidate Profile</span>
             </div>
             
             <p className="text-sm text-gray-600 mb-6">ScreenerX AI uses this profile as a baseline. Based on your current inputs, we recommend searching for:</p>
             
             <div className="space-y-4 mb-8">
               <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                 <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-bold text-[#0B1B42]">Technical Depth</h4>
                   <p className="text-xs text-gray-500 mt-1">ScreenerX AI uses this profile as a baseline. Based on your current inputs, we recommend searching for:</p>
                 </div>
               </div>
               <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                 <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-bold text-[#0B1B42]">Industry Fit</h4>
                   <p className="text-xs text-gray-500 mt-1">ScreenerX AI uses this profile as a baseline. Based on your current inputs, we recommend searching for:</p>
                 </div>
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between items-end">
                 <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">Profile Precision</span>
                 <span className="text-lg font-bold text-green-500">82%</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
               </div>
               <p className="text-xs text-gray-500 italic pt-1">Add more specific technical certifications to increase precision.</p>
             </div>
          </div>

          {/* Market Intelligence Widget */}
          <div className="bg-[#0B1B42] rounded-xl overflow-hidden shadow-sm text-white relative">
             <div className="h-28 bg-gradient-to-r from-blue-900 to-[#0B1B42] relative flex items-center justify-center overflow-hidden">
                {/* Mockup of a chart */}
                <div className="absolute bottom-0 w-full h-1/2 flex items-end opacity-20 px-4 space-x-1">
                   {[40, 70, 45, 90, 60, 80, 50, 100, 75, 50, 30].map((h, i) => (
                     <div key={i} className="flex-1 bg-blue-300 rounded-t-sm" style={{ height: `${h}%` }}></div>
                   ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B42] to-transparent"></div>
                <h3 className="relative z-10 text-lg font-bold mt-4">Market Intelligence</h3>
             </div>
             <div className="p-6 bg-white text-gray-800 rounded-b-xl border border-t-0 border-gray-200">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Avg. Salary Range</span>
                    <span className="text-sm font-bold text-[#0B1B42]">$140k - $190k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Candidate Availability</span>
                    <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">Low</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Time to Hire</span>
                    <span className="text-sm font-bold text-[#0B1B42]">24 Days</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">View Full Report</button>
             </div>
          </div>

          {/* Need Help Prompt */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start space-x-4 cursor-pointer hover:border-blue-300 transition-colors">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600 shrink-0">
               <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B1B42]">Need help with requirements?</h4>
              <p className="text-xs text-gray-500 mt-1">Talk to an AI Recruiting Expert</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Step({ number, label, active }: { number: number, label: string, active: boolean }) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div className={clsx(
        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors",
        active ? "bg-[#0B1B42] text-white shadow-md" : "bg-gray-100 text-gray-400"
      )}>
        {number}
      </div>
      <span className={clsx(
        "text-xs font-bold tracking-wider uppercase",
        active ? "text-[#0B1B42]" : "text-gray-400"
      )}>{label}</span>
    </div>
  );
}
