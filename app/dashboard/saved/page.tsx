"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  ArrowUpRight,
  BrainCircuit
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  rationale: string;
  matchScore: number;
}

export default function SavedJobsPage() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: "1",
      title: "Senior AI Engineer",
      company: "Umarava Cloud",
      location: "Remote",
      salary: "$4,500 - $6,000",
      rationale: "Matched based on your 'AI Integration' DNA (94%) and previous experience at TechNexus.",
      matchScore: 98
    },
    {
      id: "2",
      title: "Fullstack Developer",
      company: "Kasha Rwanda",
      location: "Kigali",
      salary: "$2,000 - $3,500",
      rationale: "Matched your 'Frontend Logic' DNA and proximity to Kigali. High demand for your React skill set.",
      matchScore: 85
    }
  ]);

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
           <BrainCircuit className="w-6 h-6 text-[#2B74F0]" />
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Training Hub</h1>
        </div>
        <p className="text-slate-500 font-medium">Rank and refine your saved roles to train your personal matching agent.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {savedJobs.map((job) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: 4 }}
              className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
            >
              {/* Match Score Vertical Badge */}
              <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 min-w-[100px]">
                <span className="text-2xl font-black text-[#2B74F0]">{job.matchScore}%</span>
                <span className="text-[8px] font-black uppercase tracking-tighter text-[#2B74F0]/60 mt-1">AI Match</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#2B74F0] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => removeJob(job.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-slate-50 text-[#2B74F0] rounded-2xl hover:bg-[#2B74F0] hover:text-white transition-all shadow-sm">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-[#2B74F0]/60" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <DollarSign className="w-4 h-4 text-[#2B74F0]/60" />
                    {job.salary}
                  </div>
                </div>

                {/* AI Rationale Panel */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 relative group/rationale">
                  <div className="flex items-center gap-2 mb-2 text-[#2B74F0]">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Match Analysis</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "{job.rationale}"
                  </p>
                  
                  {/* Training Controls */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/rationale:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-green-500 hover:border-green-200 transition-all shadow-sm">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-red-400 hover:border-red-200 transition-all shadow-sm">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {savedJobs.length === 0 && (
          <div className="py-24 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Bookmark className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900">No saved roles yet</h2>
            <p className="text-slate-400 mt-2">Save roles from the job board to train your AI matcher.</p>
          </div>
        )}
      </div>

      {/* AI Assistant Insight */}
      <div className="mt-16 bg-[#2B74F0] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
           <h3 className="text-2xl font-black mb-2">Training Progress: 64%</h3>
           <p className="text-blue-100 font-medium max-w-md">The more roles you rank, the better I can deliver high-quality opportunities straight to your dashboard.</p>
        </div>
        <button className="relative z-10 bg-white text-[#2B74F0] px-8 py-4 rounded-2xl font-black text-sm hover:scale-[1.05] transition-transform shadow-xl">
           View DNA Insights
        </button>
      </div>
    </div>
  );
}
