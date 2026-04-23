'use client';
import { motion } from 'framer-motion';
import { Download, Users, CheckCircle, Clock, Briefcase, ChevronRight, ChevronLeft, Sparkles, Calendar, UserPlus, Lightbulb, Plus, Terminal, Palette, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/slices/jobsSlice';
import { fetchApplicants } from '../../store/slices/applicantsSlice';
import { AppDispatch, RootState } from '../../store/store';

export default function Dashboard() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const { list: jobs } = useSelector((state: RootState) => state.jobs);
  const { list: applicants } = useSelector((state: RootState) => state.applicants);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplicants());
  }, [dispatch]);

  // Aggregate stats
  const totalApplicants = applicants.length;
  const activeJobsCount = jobs.length;
  
  // Calculate avg match score (ignoring nulls)
  const scoredApplicants = applicants.filter(a => a.match_score !== null);
  const avgMatchScore = scoredApplicants.length > 0 
    ? Math.round(scoredApplicants.reduce((sum, a) => sum + (a.match_score || 0), 0) / scoredApplicants.length)
    : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1B42]">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Admin'}!
          </h1>
          <p className="text-gray-500 mt-2">Intelligence-driven oversight for your active recruitment funnels.</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#0B1B42] hover:bg-gray-50 transition-all shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Stats
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="TOTAL APPLICANTS" value={totalApplicants.toString()} trend="+12%" positive={true} />
        <StatCard icon={CheckCircle} title="AVG. MATCH SCORE" value={`${avgMatchScore}%`} trend="+5%" positive={true} />
        <StatCard icon={Clock} title="TIME TO SHORTLIST" value="4.2 Days" trend="-2d" positive={true} />
        <StatCard icon={Briefcase} title="ACTIVE JOBS" value={activeJobsCount.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0B1B42]">Active Positions</h2>
            <div className="flex items-center space-x-4">
              <Link href="/jobs" className="text-sm font-bold text-[#0B1B42] hover:underline">View all</Link>
              <div className="flex space-x-1">
                <button 
                  onClick={() => scroll('left')}
                  className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-gray-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-gray-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-4 custom-scrollbar scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {jobs.length === 0 ? (
              <div className="flex-1 min-h-[160px] flex items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="text-center p-6">
                  <p className="text-gray-400 font-medium">No active positions yet</p>
                </div>
              </div>
            ) : (
              jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="min-w-[360px]">
                  <JobCard 
                    title={job.title} 
                    dept={`${job.department} · ${job.location}`} 
                    score="--" 
                    apps={job.applicant_count || 0} 
                    priority={job.priority} 
                  />
                </div>
              ))
            )}
          </div>

          {/* AI Insight Widget */}
          <div className="bg-gradient-to-r from-[#0B1B42] to-blue-900 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/20 flex items-center justify-between">
            <div className="flex items-start space-x-5">
              <div className="p-3 bg-white/10 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI Recruiter Assistant</h3>
                <p className="text-blue-200 text-sm mt-1 max-w-md">Our intelligence engine has tracked <span className="text-white font-bold">{totalApplicants} resumes</span>. Found {scoredApplicants.filter(a => a.match_score && a.match_score >= 90).length} high-confidence matches across all active roles.</p>
              </div>
            </div>
            <Link href="/shortlist" className="px-6 py-3 bg-white text-[#0B1B42] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all whitespace-nowrap">
              Review Matches
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B1B42]">Recent Activity</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm divide-y divide-gray-50">
            {[
              { icon: CheckCircle, color: "text-green-500", text: "AI Screening Completed for Senior AI Engineer.", time: "10m ago" },
              { icon: Calendar, color: "text-blue-500", text: "Interview Scheduled with Alex Chen.", time: "2h ago" },
              { icon: UserPlus, color: "text-indigo-500", text: "New Application for Product Designer.", time: "4h ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3 py-4 first:pt-0 last:pb-0">
                <item.icon className={clsx("w-5 h-5 shrink-0 mt-0.5", item.color)} />
                <div>
                  <p className="text-sm text-gray-800 leading-snug">{item.text}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.time}</p>
                </div>
              </div>
            ))}
            <div className="mt-6 pt-4 text-center">
              <Link href="/audit" className="text-xs font-bold text-[#0B1B42] uppercase tracking-widest hover:underline">Full Activity Log</Link>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 relative overflow-hidden">
             <div className="flex items-center space-x-2 text-[#0B1B42] font-bold text-[10px] uppercase tracking-widest mb-3">
               <Lightbulb className="w-4 h-4" />
               <span>AI Intelligence Tip</span>
             </div>
             <p className="text-sm text-gray-600 italic font-medium leading-relaxed">
               "Candidates for 'Product Designer' are responding well to remote-first perks. Consider emphasizing this in your listings."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, positive }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-gray-50 rounded-xl text-[#0B1B42]">
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={clsx(
            "text-[10px] font-bold px-2 py-1 rounded-lg",
            positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1 uppercase">{title}</p>
      <h3 className="text-3xl font-bold text-[#0B1B42]">{value}</h3>
    </div>
  );
}

function JobCard({ title, dept, score, apps, priority }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-blue-500/30 transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <Terminal className="w-5 h-5 text-blue-600" />
        </div>
        <span className={clsx(
          "text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase",
          priority === 'HIGH' ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
        )}>
          {priority} Priority
        </span>
      </div>
      <h3 className="font-bold text-[#0B1B42] text-lg leading-tight">{title}</h3>
      <p className="text-xs text-gray-400 mt-1 mb-8">{dept}</p>
      
      <div className="flex justify-between items-end border-t border-gray-50 pt-4">
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200"></div>
          ))}
          <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
            +{apps}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Match Score</p>
          <p className="text-2xl font-bold text-green-600">{score}%</p>
        </div>
      </div>
    </div>
  );
}
