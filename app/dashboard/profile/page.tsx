"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  MapPin, 
  Edit3, 
  Camera, 
  Plus,
  Download,
  FileText,
  BadgeCheck,
  Zap
} from "lucide-react";
import DNAGraph from "@/components/dna-graph";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Candidate Persona</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your identity and AI-matching visibility.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 py-3 px-6 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            Preview Profile
          </button>
          <button className="bg-[#2B74F0] text-white py-3 px-6 rounded-2xl font-black text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - 4 Columns */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Identity Card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all group">
            <div className="h-32 bg-gradient-to-r from-[#2B74F0] to-blue-600 p-6 relative">
               <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
                 <BadgeCheck className="w-3 h-3" />
                 AI Verified
               </div>
            </div>
            <div className="px-8 pb-8 flex flex-col items-center">
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-[2.2rem] bg-slate-100 flex items-center justify-center text-[#2B74F0] text-4xl font-black border border-slate-50">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 bg-white p-2.5 rounded-2xl border border-slate-100 text-[#2B74F0] hover:scale-110 transition-transform shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-2xl font-black text-slate-900 text-center">{user?.email?.split('@')[0]}</h2>
              <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Senior Software Engineer</p>
              
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <span className="flex items-center gap-1.5 bg-blue-50 text-[#2B74F0] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                  <MapPin className="w-3 h-3" /> Kigali, Rwanda
                </span>
                <span className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-slate-100">
                  Open to Work
                </span>
              </div>

              <div className="w-full mt-10 space-y-4 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500 hover:text-[#2B74F0] transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold truncate max-w-[180px]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 hover:text-[#2B74F0] transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">+250 788 123 456</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 hover:text-[#2B74F0] transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">portfolio.umarava.ai</span>
                </div>
              </div>
            </div>
          </div>

          {/* DNA Graph component */}
          <DNAGraph />
        </div>

        {/* Right Column - 8 Columns */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* AI Professional Summary */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#2B74F0]">
                <Zap className="w-5 h-5 fill-current" />
                <h3 className="text-xs font-black uppercase tracking-widest">AI Character Summary</h3>
              </div>
              <button className="text-slate-300 hover:text-slate-900 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
              "A results-driven engineer specializing in scalable AI infrastructure. Known for bridging the gap between high-level logic and performant user interfaces, Sarah excels in environments that require rapid innovation and deep technical ownership."
            </p>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900">Experience DNA</h3>
              <button className="bg-slate-50 border border-slate-100 text-slate-900 py-3 px-6 rounded-2xl font-black text-xs hover:bg-slate-100 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  role: "Lead Systems Architect",
                  company: "TechNexus Rwanda",
                  period: "Jan 2023 - Present",
                  description: "Spearheaded the development of a real-time data ingestion platform serving over 1M requests daily. Integrated AI-driven monitoring to reduce downtime by 40%."
                },
                {
                  role: "Senior Software Engineer",
                  company: "Irembo",
                  period: "Jun 2020 - Dec 2022",
                  description: "Full-stack development of citizen-centric digital services. Mentored junior developers and established modern CI/CD practices."
                }
              ].map((exp, i) => (
                <div key={i} className="relative pl-10 border-l-2 border-slate-100">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-white rounded-full border-4 border-[#2B74F0] shadow-sm" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 leading-none">{exp.role}</h4>
                      <p className="text-sm font-bold text-slate-400 mt-2">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analyzed Docs */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-8">AI Analyzed Documents</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-[#2B74F0] hover:bg-white transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-black text-slate-900 truncate">Main_Resume_2026.pdf</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">AI Verified • 1.4 MB</p>
                  </div>
                  <Download className="w-5 h-5 text-slate-300 group-hover:text-[#2B74F0] transition-colors" />
                </div>
                
                <div className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/30 hover:bg-white hover:border-[#2B74F0] transition-all cursor-pointer text-center group">
                  <Plus className="w-6 h-6 text-slate-300 group-hover:text-[#2B74F0] transition-colors mb-2" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#2B74F0]">New Document</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
