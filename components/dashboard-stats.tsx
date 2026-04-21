"use client";

import React from "react";
import { motion } from "framer-motion";

import { 
  ClipboardList, 
  Zap, 
  Users, 
  Trophy 
} from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: any;
  color: string;
  description: string;
}

const StatCard = ({ label, value, icon: Icon, color, description }: StatCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-inner`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-right">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</h3>
        <p className="text-4xl font-black text-slate-900 mt-1">{value}</p>
      </div>
    </div>
    <p className="mt-4 text-xs text-slate-400 font-medium leading-relaxed">
      {description}
    </p>
  </motion.div>
);

interface DashboardStatsProps {
  stats: {
    totalApplied: number;
    inProgress: number;
    interviews: number;
    offers: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      label: "Total Applied",
      value: stats.totalApplied,
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
      description: "Jobs you've submitted interest for."
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Zap,
      color: "bg-orange-50 text-orange-600",
      description: "Applications currently being reviewed."
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      description: "Scheduled meetings with recruiters."
    },
    {
      label: "Offers",
      value: stats.offers,
      icon: Trophy,
      color: "bg-emerald-50 text-emerald-600",
      description: "Congratulations! Roles offered to you."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
