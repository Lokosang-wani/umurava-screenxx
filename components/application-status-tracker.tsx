"use client";

import React from "react";
import { motion } from "framer-motion";

import { Check, Circle } from "lucide-react";

interface StatusStepProps {
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLast: boolean;
}

const StatusStep = ({ label, isCompleted, isCurrent, isLast }: StatusStepProps) => (
  <div className={`flex flex-col items-center relative ${isLast ? "" : "flex-1"}`}>
    {/* Line */}
    {!isLast && (
      <div 
        className={`absolute top-4 left-1/2 w-full h-[3px] -translate-y-1/2 z-0 transition-colors duration-500 ${
          isCompleted ? "bg-[#2B74F0]" : "bg-slate-100"
        }`} 
      />
    )}
    
    {/* Dot */}
    <div 
      className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
        isCompleted 
          ? "bg-[#2B74F0] border-[#2B74F0] text-white shadow-[0_0_10px_rgba(43,116,240,0.3)]" 
          : isCurrent
            ? "bg-white border-[#2B74F0] text-[#2B74F0] scale-110 ring-4 ring-blue-50"
            : "bg-white border-slate-200 text-slate-300"
      }`}
    >
      {isCompleted ? (
        <Check className="w-4 h-4" strokeWidth={4} />
      ) : isCurrent ? (
        <div className="w-2 h-2 bg-[#2B74F0] rounded-full animate-pulse" />
      ) : (
        <Circle className="w-2 h-2 fill-slate-200 stroke-none" />
      )}
    </div>
    
    {/* Label */}
    <span className={`mt-3 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
      isCurrent ? "text-[#2B74F0]" : isCompleted ? "text-slate-900" : "text-slate-400"
    }`}>
      {label}
    </span>
  </div>
);

interface ApplicationStatusTrackerProps {
  status: string;
}

export default function ApplicationStatusTracker({ status }: ApplicationStatusTrackerProps) {
  const steps = ["Submitted", "Analyzed", "Interview", "Offer"];
  
  const getStatusIndex = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case "submitted": return 0;
      case "analyzed": return 1;
      case "interview": return 2;
      case "hired": return 3;
      case "offer": return 3;
      case "rejected": return -1;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(status);

  if (currentIndex === -1) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
        <span className="text-sm">❌</span> Application Rejected
      </div>
    );
  }

  return (
    <div className="flex w-full px-2 max-w-sm ml-auto">
      {steps.map((step, i) => (
        <StatusStep 
          key={step}
          label={step}
          isCompleted={i < currentIndex}
          isCurrent={i === currentIndex}
          isLast={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
