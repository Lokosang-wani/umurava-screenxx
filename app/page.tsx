"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useAuth } from "@/lib/auth-context";
import { fetchPublishedJobs, type JobRow } from "@/lib/hiring-data";
import JobCard from "@/components/job-card";
import JobDetailsModal from "@/components/job-details-modal";
import JobFilters from "@/components/job-filters";
import GlobeAnimation from "@/components/globe-animation";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Briefcase,
  ArrowRight,
  Cpu,
  BrainCircuit,
  Wand2,
  X
} from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Senior Frontend Rwanda",
  "Remote Product Design",
  "Banking Backend Developer",
  "Full-time Junior Roles"
];
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobRow | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const publishedJobs = await fetchPublishedJobs();
        setJobs(publishedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Simple semantic-style matcher for demo
  const getMatchData = (job: JobRow, prompt: string) => {
    if (!prompt) return { isMatch: true, score: 100 };
    
    const p = prompt.toLowerCase();
    const t = job.title.toLowerCase();
    const d = job.description.toLowerCase();
    const l = (job.location || "").toLowerCase();
    
    let score = 0;
    const keywords = p.split(' ').filter(k => k.length > 2);
    
    if (keywords.length === 0) return { isMatch: true, score: 100 };

    keywords.forEach(kw => {
      if (t.includes(kw)) score += 40;
      if (d.includes(kw)) score += 20;
      if (l.includes(kw)) score += 30;
    });

    // Normalize score to max 99
    const finalScore = Math.min(Math.max(Math.floor((score / (keywords.length * 40)) * 100), 10), 99);
    const isMatch = score > 0;
    
    return { isMatch, score: finalScore };
  };

  const filteredJobs = jobs
    .map(job => ({ ...job, ...getMatchData(job, aiPrompt) }))
    .filter(job => job.isMatch)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Restored with Globe & AI Focus */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f9fc] to-white pb-16 pt-16 md:pb-24 md:pt-24 lg:pt-32">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 opacity-40" 
          style={{ 
            backgroundImage: `radial-gradient(#2B74F0 0.5px, transparent 0.5px)`, 
            backgroundSize: '30px 30px' 
          }} 
        />
        
        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: AI Value Proposition */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#2B74F0]/5 border border-[#2B74F0]/10 mb-8">
                <Cpu className="w-4 h-4 text-[#2B74F0]" />
                <span className="text-sm font-bold text-[#2B74F0] uppercase tracking-widest">
                  Next-Gen AI Talent Search
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Get Your Next <br />
                <span className="text-[#2B74F0] relative">
                  Role with AI 
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#2B74F0]/10 -z-10" />
                </span>
                <br />
                Faster than Ever.
              </h1>
              
              <p className="mt-8 text-xl text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Umarava leverages proprietary AI to match top candidates with the perfect roles. 
                Don&apos;t just search—get discovered by global opportunities.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <button className="w-full sm:w-auto bg-[#2B74F0] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-xl shadow-blue-500/25 text-lg flex items-center justify-center gap-2">
                  Find Jobs Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition border border-slate-200 text-lg">
                  Learn AI Matching
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition duration-500">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Trusted By</p>
                <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start">
                  <span className="font-bold text-lg text-slate-500 whitespace-nowrap">Bank of Kigali</span>
                  <span className="font-bold text-lg text-slate-500 whitespace-nowrap">MTN Rwanda</span>
                  <span className="font-bold text-lg text-slate-500 whitespace-nowrap">I&M Bank</span>
                  <span className="font-bold text-lg text-slate-500 whitespace-nowrap">Inyange</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Globe Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <div className="w-full max-w-[600px] lg:max-w-none">
                <GlobeAnimation />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-blue-100 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discovery Hub - Integrated Filters into Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
             <BrainCircuit className="w-6 h-6 text-[#2B74F0]" />
             <h2 className="text-3xl font-black text-slate-900">AI Discovery Hub</h2>
          </div>
          
          {/* Next-Gen AI Prompt Bar */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2B74F0] to-purple-600 rounded-[3rem] blur opacity-15 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-2 ring-1 ring-slate-100/50">
              <div className="flex-1 w-full flex items-center px-6 gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${aiPrompt ? 'bg-blue-50 text-[#2B74F0]' : 'bg-slate-50 text-slate-300'}`}>
                  {isMatching ? <Wand2 className="w-6 h-6 animate-spin" /> : <BrainCircuit className="w-6 h-6" />}
                </div>
                <input 
                  type="text"
                  placeholder="Tell AI any job you want..."
                  value={aiPrompt}
                  onChange={(e) => {
                    setAiPrompt(e.target.value);
                    setIsMatching(true);
                    setTimeout(() => setIsMatching(false), 600);
                  }}
                  className="w-full py-5 bg-transparent outline-none text-slate-900 font-extrabold text-xl placeholder:text-slate-300 border-none focus:ring-0"
                />
                {aiPrompt && (
                  <button 
                    onClick={() => {
                      setAiPrompt("");
                    }}
                    className="p-2 hover:bg-slate-50 rounded-full text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button className="w-full md:w-auto bg-[#2B74F0] text-white px-12 py-5 rounded-[2.5rem] font-black text-sm hover:scale-[1.02] hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
                Delivering...
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Suggested Prompts UX */}
          <div className="flex flex-wrap items-center gap-3 mb-10 px-4">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mr-2">Try these:</span>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setAiPrompt(prompt);
                  setIsMatching(true);
                  setTimeout(() => setIsMatching(false), 800);
                }}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500 hover:border-[#2B74F0]/30 hover:text-[#2B74F0] hover:bg-white transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <JobFilters 
            onSearch={(tag) => {
              setAiPrompt(tag);
              setIsMatching(true);
              setTimeout(() => setIsMatching(false), 800);
            }} 
            showRecommendations={!!user} 
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
              Latest Openings
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest pt-2">
                {filteredJobs.length} Results
              </span>
            </h2>
            <p className="text-slate-400 font-medium mt-2">Handpicked opportunities for you.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
               Most Recent <ArrowRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-red-50 border border-red-100 rounded-3xl">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-slate-50 rounded-[3rem] p-24 text-center border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Briefcase className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No roles found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your keywords or location to find more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                matchScore={job.score}
                onViewDetails={(j) => setSelectedJob(j)}
              />
            ))}
          </div>
        )}
      </main>

      <JobDetailsModal 
        job={selectedJob} 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />

      {/* Footer / CTA Section */}
      <footer className="bg-slate-900 py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to accelerate your career?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Create an account to track your applications and get personalized job recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-[#2B74F0] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-lg shadow-blue-500/20">
              Get Started Now
            </button>
            <button className="w-full sm:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
