"use client";

import React from "react";
import { type JobRow } from "@/lib/hiring-data";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface JobDetailsModalProps {
  job: JobRow | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Close Button (Top Right) */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="flex flex-col gap-6">
                  {/* Badge & Date */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2B74F0] bg-blue-50 px-4 py-1.5 rounded-full">
                      Full-time
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Posted on {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                    {job.title}
                  </h2>

                  <div className="h-px w-full bg-slate-100 my-4" />

                  {/* Body */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">About this role</h3>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                      {job.description}
                    </div>
                  </div>

                  {/* AI Value Proposition */}
                  <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-5">
                    <div className="w-12 h-12 bg-[#2B74F0]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">AI-Powered Application</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Our AI engine will analyze your profile against this specific role to highlight your best matches and identify potential growth areas instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="p-8 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500">
                  Join <span className="font-bold text-slate-900">Umarava</span> and accelerate your career.
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition border border-slate-200"
                  >
                    Close
                  </button>
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="flex-1 sm:flex-none bg-[#2B74F0] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-lg shadow-blue-500/20 text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
