'use client';
import { useParams } from 'next/navigation';
import { ArrowLeft, Sparkles, CheckCircle2, ChevronDown, X, Save } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

export default function EditJobPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [techSkills, setTechSkills] = useState(['Python', 'PyTorch', 'LLMs']);
  const [softSkills, setSoftSkills] = useState(['Leadership', 'Critical Thinking']);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href={`/jobs/${jobId}`} className="mr-4 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#0B1B42]">Edit Job: Senior AI Engineer</h1>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Form) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stepper */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between relative">
             <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gray-100 -z-0 -translate-y-1/2"></div>
             <Step number={1} label="Details" active={currentStep >= 1} />
             <Step number={2} label="Requirements" active={currentStep >= 2} />
             <Step number={3} label="Matching AI" active={currentStep >= 3} />
             <Step number={4} label="Preview" active={currentStep >= 4} />
          </div>

          {/* Form Sections */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-8">
             
             {currentStep === 1 && (
               <div>
                 <h2 className="text-lg font-bold text-[#0B1B42]">Basic Information</h2>
                 <p className="text-sm text-gray-500 mb-6 mt-1">Update the core identity of the role</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Job Title</label>
                     <input type="text" defaultValue="Senior AI Engineer" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Department</label>
                     <div className="relative">
                       <select defaultValue="Engineering" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none bg-white">
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
                   <textarea rows={4} defaultValue="Briefly describe the mission of this role..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                 </div>
               </div>
             )}

             {currentStep === 2 && (
               <div>
                 <h2 className="text-lg font-bold text-[#0B1B42] mb-6">Job Requirements</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div>
                     <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">Years of Experience</label>
                     <div className="flex items-center space-x-3">
                       <input type="number" defaultValue="5" className="w-20 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
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
                   <input type="text" placeholder="Add a skill and press Enter..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
               </div>
             )}

             {currentStep > 2 && (
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0B1B42] mb-2">Updating AI Baseline...</h2>
                  <p className="text-gray-500 text-sm text-center max-w-md">Changing requirements may cause match scores for existing applicants to be recalculated.</p>
               </div>
             )}

             {/* Footer Actions */}
             <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                {currentStep > 1 ? (
                  <button onClick={prevStep} className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">Back</button>
                ) : <div></div>}
                <div className="flex space-x-4">
                  {currentStep < 4 ? (
                    <button onClick={nextStep} className="px-6 py-2.5 text-sm font-medium bg-[#0B1B42] text-white rounded-lg hover:bg-blue-900 transition-colors shadow-sm">
                      {currentStep === 1 ? 'Continue to Requirements' : 'Review AI Changes'}
                    </button>
                  ) : (
                    <Link href={`/jobs/${jobId}`} className="px-6 py-2.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                      Confirm Updates
                    </Link>
                  )}
                </div>
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
