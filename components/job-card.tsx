"use client";

import Link from "next/link";
import { type JobRow } from "@/lib/hiring-data";

import { 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Clock, 
  Cpu,
  ArrowRight 
} from "lucide-react";

interface JobCardProps {
  job: JobRow;
  matchScore?: number;
  onViewDetails: (job: JobRow) => void;
}

export default function JobCard({ job, matchScore, onViewDetails }: JobCardProps) {
  // Demo Fallbacks
  const location = job.location || "Remote";
  const salary = job.salary_range || "$2,000 - $4,500";
  const type = job.type || "Full-time";
  const level = job.experience_level || "Senior Level";
  const displayScore = matchScore || 0;

  return (
    <article className="bg-white rounded-[2rem] p-8 shadow-sm ring-1 ring-slate-100 hover:ring-[#2B74F0]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2B74F0] font-black text-xl border border-blue-100/50 shadow-inner">
            {job.title.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#2B74F0] transition-colors leading-tight">
                {job.title}
              </h3>
              {displayScore > 0 && (
                <div className="bg-[#2B74F0]/10 text-[#2B74F0] px-2 py-0.5 rounded-lg flex items-center gap-1 border border-[#2B74F0]/20 animate-in fade-in zoom-in duration-500">
                  <Cpu className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">{displayScore}% Match</span>
                </div>
              )}
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Umarava Partner</p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-[#2B74F0] transition-colors p-2">
          <Bookmark className="w-5 h-5 transition-transform hover:scale-110" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-100">
          {type}
        </span>
        <span className="bg-blue-50 text-[#2B74F0] font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-100">
          {level}
        </span>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin className="w-4 h-4 text-[#2B74F0]/60" />
          <span className="text-xs font-bold">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <DollarSign className="w-4 h-4 text-[#2B74F0]/60" />
          <span className="text-xs font-bold">{salary}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(job)}
        className="w-full mt-6 bg-slate-50 text-slate-900 py-4 rounded-2xl font-black text-sm hover:bg-[#2B74F0] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-slate-100"
      >
        View Role Details
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </article>
  );
}
