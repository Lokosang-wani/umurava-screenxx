"use client";

import React from "react";
import { motion } from "framer-motion";

interface DNAStatProps {
  label: string;
  value: number; // 0 to 100
  color: string;
}

const DNAStat = ({ label, value, color }: DNAStatProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

export default function DNAGraph() {
  const stats = [
    { label: "AI Integration", value: 94, color: "#2B74F0" },
    { label: "Frontend Logic", value: 88, color: "#6366f1" },
    { label: "System Design", value: 76, color: "#8b5cf6" },
    { label: "User Psychology", value: 82, color: "#3b82f6" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#2B74F0] animate-pulse" />
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Technical DNA</h3>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <DNAStat key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50">
        <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
          AI generated based on 42 successfully shipped features and peer recognition.
        </p>
      </div>
    </div>
  );
}
