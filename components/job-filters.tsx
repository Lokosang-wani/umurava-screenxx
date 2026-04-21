"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Code, 
  Layout, 
  BarChart, 
  Search,
  Filter
} from "lucide-react";

interface TrendingTagProps {
  label: string;
  icon: any;
  onClick: (label: string) => void;
}

const TrendingTag = ({ label, icon: Icon, onClick }: TrendingTagProps) => (
  <motion.button 
    whileHover={{ y: -2, backgroundColor: "rgba(43, 116, 240, 0.08)" }}
    onClick={() => onClick(label)}
    className="flex-shrink-0 bg-white border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-2 transition-all duration-200 shadow-sm hover:border-[#2B74F0]/30 group"
  >
    <Icon className="w-4 h-4 text-[#2B74F0] group-hover:scale-110 transition-transform" />
    <span className="text-sm font-bold text-slate-700 leading-none">{label}</span>
  </motion.button>
);

interface JobFiltersProps {
  onSearch: (term: string) => void;
  showRecommendations?: boolean;
}

export default function JobFilters({ onSearch, showRecommendations }: JobFiltersProps) {
  const recommendations = [
    { label: "Senior Frontend Engineer", icon: Code },
    { label: "Product Designer", icon: Layout },
    { label: "Data Analyst", icon: BarChart },
    { label: "Backend Developer", icon: Search },
  ];

  return (
    <div className="space-y-8">
      {/* Recommendations - Signed-in only logic passed from parent */}
      {showRecommendations && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2B74F0] animate-pulse" />
            Recommended for You
          </h3>
          <div className="flex overflow-x-auto pb-4 gap-3 cursor-grab active:cursor-grabbing hide-scrollbar">
            {recommendations.map((rec) => (
              <TrendingTag 
                key={rec.label} 
                label={rec.label} 
                icon={rec.icon} 
                onClick={onSearch}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
