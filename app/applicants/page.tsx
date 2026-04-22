'use client';

import { Users, FileText, FileSpreadsheet, Mail, Link as LinkIcon, Globe2, UploadCloud, ChevronRight, Pause, X, FileArchive, Check, HelpCircle, Sparkles, CheckCircle2, Play } from 'lucide-react';
import Link from 'next/link';

export default function IngestApplicants() {
  return (
    <div className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-[#0B1B42] transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/applicants" className="hover:text-[#0B1B42] transition-colors">Applicants</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#0B1B42] font-bold">Ingestion</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Import Controls */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-lg font-bold text-[#0B1B42]">Import Methods</h2>
                 <p className="text-sm text-gray-500 mt-1">Select your preferred source to start parsing talent.</p>
               </div>
               <span className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100 uppercase tracking-wider">
                 <Sparkles className="w-3 h-3 mr-1" />
                 AI Enhanced Parsing
               </span>
             </div>

             {/* Import Options */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors group">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                   <Users className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-[#0B1B42] text-sm mb-1">ScreenerX Talent Pool</h3>
                 <p className="text-xs text-gray-500 text-center">Sync from curated community database</p>
               </button>
               
               <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-green-200 bg-green-50 rounded-xl hover:border-green-400 transition-colors group relative overflow-hidden">
                 <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                   <FileText className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-[#0B1B42] text-sm mb-1">Upload PDF Resumes</h3>
                 <p className="text-xs text-green-600 font-medium text-center">Batch upload CVs for deep AI analysis</p>
               </button>

               <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors group">
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                   <FileSpreadsheet className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-[#0B1B42] text-sm mb-1">Upload CSV/Spreadsheet</h3>
                 <p className="text-xs text-gray-500 text-center">Import structured candidate lists</p>
               </button>
             </div>

             <div className="h-px bg-gray-100 w-full mb-8"></div>

             {/* Auto-Sync */}
             <div className="mb-6">
               <h3 className="text-sm font-bold text-[#0B1B42] mb-1">Auto-Sync Connections</h3>
               <p className="text-xs text-gray-500 mb-4">Link your external platforms for seamless applicant synchronization.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                   <div className="flex items-center space-x-3 mb-3">
                     <Mail className="w-6 h-6 text-red-500" />
                     <h4 className="font-bold text-[#0B1B42] text-sm">Gmail Integration</h4>
                   </div>
                   <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Clip candidates from any job board directly into ScreenerX</p>
                   <button className="w-full py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">Connect Inbox</button>
                 </div>

                 <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                   <div className="flex items-center space-x-3 mb-3">
                     <LinkIcon className="w-6 h-6 text-blue-600" />
                     <h4 className="font-bold text-[#0B1B42] text-sm">LinkedIn Recruiter</h4>
                   </div>
                   <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Clip candidates from any job board directly into ScreenerX</p>
                   <button className="w-full py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">Sync Pipeline</button>
                 </div>

                 <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                   <div className="flex items-center space-x-3 mb-3">
                     <Globe2 className="w-6 h-6 text-green-500" />
                     <h4 className="font-bold text-[#0B1B42] text-sm">Browser Extension</h4>
                   </div>
                   <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Clip candidates from any job board directly into ScreenerX</p>
                   <button className="w-full py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors">Install</button>
                 </div>
               </div>
             </div>

             {/* Drag and Drop Zone */}
             <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="p-3 bg-white text-blue-600 rounded-full shadow-sm">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1B42]">Drag and drop files here</h3>
                    <p className="text-xs text-gray-500 mt-1">Supported formats: .pdf, .docx, .csv, .xlsx (Max 50MB per file)</p>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-[#0B1B42] text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm whitespace-nowrap">
                  Browse Files
                </button>
             </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <div>
                 <h2 className="text-lg font-bold text-[#0B1B42]">Recent Uploads</h2>
                 <p className="text-sm text-gray-500 mt-1">Live processing status of candidate batches</p>
               </div>
               <button className="text-sm font-bold text-blue-600 hover:underline flex items-center">
                 View All History <ChevronRight className="w-4 h-4 ml-1" />
               </button>
             </div>

             <div className="space-y-6">
               
               {/* Upload Item 1 */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4 w-full">
                   <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
                     <FileArchive className="w-6 h-6" />
                   </div>
                   <div className="flex-1 mr-8">
                     <div className="flex justify-between items-center mb-2">
                       <h4 className="font-bold text-[#0B1B42] text-sm">Resumes_Software_Eng_Q3.zip</h4>
                       <span className="text-xs font-bold text-green-600">72% Processed</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                       <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                     </div>
                     <div className="flex justify-between text-xs text-gray-500">
                       <span>42 candidates detected</span>
                       <span>Est. 2 mins remaining</span>
                     </div>
                   </div>
                 </div>
                 <div className="flex space-x-2 shrink-0">
                   <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded"><Pause className="w-4 h-4" /></button>
                   <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                 </div>
               </div>

               <div className="h-px bg-gray-100 w-full"></div>

               {/* Upload Item 2 */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4 w-full">
                   <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                     <FileSpreadsheet className="w-6 h-6" />
                   </div>
                   <div className="flex-1 mr-8">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="font-bold text-[#0B1B42] text-sm">Marketing_Lead_Applicants.csv</h4>
                       <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase tracking-wider">
                         <Check className="w-3 h-3 mr-1" /> Completed
                       </span>
                     </div>
                     <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                       <span>128 candidates imported</span>
                       <span className="text-green-600 font-medium">• 85 matches found</span>
                     </div>
                   </div>
                 </div>
                 <div className="shrink-0">
                   <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Review Matches</button>
                 </div>
               </div>

             </div>
          </div>

          {/* Help Banner */}
          <div className="bg-[#4E6297] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between text-white">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="p-3 bg-white/20 rounded-full">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need help with large migrations?</h3>
                <p className="text-sm text-blue-100 mt-1">Our technical team can assist with enterprise-level ATS migrations and large data imports.</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white text-[#4E6297] rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
              Contact Support
            </button>
          </div>

        </div>

        {/* Right Column: AI Ingestion Engine */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
             <div className="flex items-center space-x-2 text-blue-600 font-bold text-lg mb-4">
               <Sparkles className="w-5 h-5" />
               <span>AI Ingestion Engine</span>
             </div>
             <p className="text-sm text-gray-600 mb-6 leading-relaxed">
               Our AI automatically extracts skills, experience levels, and contact info. It then calculates a <strong className="text-green-600 font-bold">Match Score</strong> based on your current job openings.
             </p>
             
             <div className="space-y-4 mb-8">
               <div className="flex items-center space-x-3">
                 <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-700 font-medium">Auto-deduplication enabled</span>
               </div>
               <div className="flex items-center space-x-3">
                 <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-700 font-medium">Skill-to-Job mapping active</span>
               </div>
               <div className="flex items-center space-x-3">
                 <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                 <span className="text-sm text-gray-700 font-medium">GDPR & Bias Filtering applied</span>
               </div>
             </div>

             {/* Placeholder for the AI visual / image from the design */}
             <div className="rounded-xl overflow-hidden aspect-video bg-gray-900 relative">
                {/* This represents the futuristic face image from the design */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                   <Sparkles className="w-24 h-24" />
                </div>
             </div>
             
             <div className="mt-6 flex justify-end">
               <button className="w-12 h-12 bg-[#0B1B42] text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors shadow-lg">
                 <Play className="w-5 h-5 fill-current" />
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
