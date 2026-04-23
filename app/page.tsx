'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowRight, ShieldCheck, BarChart3, Users2, Search, 
  CheckCircle2, Clock, Sparkles, LayoutDashboard, Globe, 
  ChevronRight, Play, Quote, Cpu, Briefcase, FileText, User, 
  BrainCircuit, Terminal, Activity, Fingerprint
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

const LOGOS = [
  "Nexus", "Vercel", "DeepMind", "Scale AI", "Supabase", "Linear"
];

const TESTIMONIALS = [
  {
    quote: "ScreenerX reduced our time-to-hire by 70%. The AI doesn't just scan keywords; it actually understands candidate potential.",
    author: "Sarah Jenkins",
    role: "Head of Talent, Nexus Intelligence",
    img: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The match scores are surprisingly accurate. We no longer spend weeks on initial screenings. It's a game changer.",
    author: "Michael Chen",
    role: "HR Director, Scale AI",
    img: "https://i.pravatar.cc/150?u=michael"
  }
];

function ProductDemo() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0B1B42] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px]">
      {/* Background Neural Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-700" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse delay-1000" />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-8"
          >
            <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center animate-bounce">
              <FileText className="w-10 h-10 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-black text-white italic">Ingesting Profile...</h4>
              <p className="text-blue-300 font-medium">Parsing candidate DNA from PDF/LinkedIn</p>
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-blue-500" 
              />
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-white/20 rounded-full" />
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="h-2 bg-white/5 rounded-full w-full relative overflow-hidden"
                  >
                     <motion.div 
                        animate={{ x: [-100, 400] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                        className="absolute inset-0 w-20 bg-blue-400/30" 
                     />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-left space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-3xl font-black text-white italic leading-tight">Neural <br /> Evaluation</h4>
              <p className="text-blue-300 font-medium">Analyzing skill trajectory, project complexity, and seniority depth.</p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="relative">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20" 
               />
               <div className="text-[120px] font-black text-blue-500 leading-none italic mb-4">94%</div>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white">Match Confidence High</h4>
              <p className="text-blue-300 font-medium max-w-sm mx-auto">Candidate exceeds requirements for <span className="text-white">Senior AI Engineer</span> role.</p>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-end">
              <div className="text-left">
                <p className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-1">Final Intelligence Report</p>
                <h4 className="text-3xl font-black text-white italic">Insights Generated.</h4>
              </div>
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Technical Depth", val: "Expert" },
                { label: "Risk Factor", val: "Low" },
                { label: "Growth Potential", val: "High" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left">
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-xl font-bold text-white italic">{item.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={clsx(
              "h-1 rounded-full transition-all duration-500",
              step === i ? "w-8 bg-blue-500" : "w-2 bg-white/10"
            )} 
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [activeComparison, setActiveComparison] = useState<'traditional' | 'screenerx'>('screenerx');
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-[#0B1B42] selection:bg-blue-100 selection:text-blue-700 font-sans">
      
      {/* 2050 Dynamic Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-white/70 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2.5rem] px-8 py-3 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 shrink-0">
              <img src="/screenerx-logo.png" alt="ScreenerX Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#0B1B42]">ScreenerX</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[13px] font-bold text-gray-500">
            <a href="#solutions" className="hover:text-blue-600 transition-all">Solutions</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-all">How it Works</a>
          </div>

          <div className="flex items-center space-x-2">
             <Link href="/auth/signin" className="px-5 py-2.5 bg-[#0B1B42] text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
              Launch App
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Futuristic Hero Section */}
      <section ref={targetRef} className="relative pt-32 pb-48 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Holographic Background Elements */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-400/10 via-blue-400/5 to-transparent rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.div 
            style={{ opacity, scale, y }}
            className="flex flex-col items-center"
          >
            <h1 className="text-7xl md:text-[140px] font-black text-[#0B1B42] leading-[0.85] tracking-[-0.06em] mb-12">
              Stop scanning. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-900 italic">Start hiring.</span>
            </h1>

            <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed mb-16 font-medium tracking-tight">
              ScreenerX is the autonomous intelligence layer for recruitment. <br />
              Evaluate depth, nuance, and true potential — in milliseconds.
            </p>

            <div className="flex flex-col items-center justify-center">
              <Link href="/auth/signin" className="group relative px-12 py-6 bg-[#0B1B42] text-white rounded-[2rem] font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(11,27,66,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  Start Pro Access Free
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest opacity-60">
                No credit card required. 100% Free.
              </p>
            </div>
          </motion.div>

          {/* Dynamic Demo Widget */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 relative max-w-5xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
              
              <div className="bg-white/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/50 p-4 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.15)] overflow-hidden">
                <ProductDemo />
              </div>

              {/* Floating Meta Data */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 bg-white p-6 rounded-[2rem] shadow-2xl z-30 border border-gray-100 hidden lg:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">System Status</p>
                    <p className="text-sm font-bold text-[#0B1B42]">Verified Match</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="solutions" className="py-48 px-6 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.5em] mb-6">The Evolution</h2>
            <h3 className="text-6xl md:text-8xl font-black text-[#0B1B42] tracking-tighter">Beyond <br /><span className="text-blue-600 italic">screening.</span></h3>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden border border-white">
            <div className="grid grid-cols-2">
              <button 
                onClick={() => setActiveComparison('traditional')}
                className={clsx(
                  "p-10 text-xl font-black transition-all",
                  activeComparison === 'traditional' ? "bg-gray-50 text-[#0B1B42]" : "text-gray-300 hover:text-gray-600"
                )}
              >
                Legacy Ops
              </button>
              <button 
                onClick={() => setActiveComparison('screenerx')}
                className={clsx(
                  "p-10 text-xl font-black transition-all flex items-center justify-center space-x-3",
                  activeComparison === 'screenerx' ? "bg-blue-600 text-white" : "text-gray-300 hover:text-gray-600"
                )}
              >
                <Zap className="w-6 h-6 fill-current" />
                <span>Neural Intelligence</span>
              </button>
            </div>
            <div className="p-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {activeComparison === 'traditional' ? (
                  <>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Clock className="w-7 h-7 text-gray-400" />
                      </div>
                      <h4 className="text-2xl font-black italic">Weeks</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Latency in candidate response and initial screening cycles.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Search className="w-7 h-7 text-gray-400" />
                      </div>
                      <h4 className="text-2xl font-black italic">Surface</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Relying on keyword frequency and resume formatting.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Users2 className="w-7 h-7 text-gray-400" />
                      </div>
                      <h4 className="text-2xl font-black italic">Manual</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Inconsistent evaluation based on human fatigue and bias.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Zap className="w-7 h-7 text-blue-600" />
                      </div>
                      <h4 className="text-2xl font-black italic">Millisec</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Zero-latency evaluation from intent to matching score.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Cpu className="w-7 h-7 text-blue-600" />
                      </div>
                      <h4 className="text-2xl font-black italic">Neural</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Multidimensional understanding of skill depth and trajectory.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-7 h-7 text-blue-600" />
                      </div>
                      <h4 className="text-2xl font-black italic">Absolute</h4>
                      <p className="text-gray-400 font-medium leading-relaxed">Unbiased, objective precision grounded in verified performance.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-48 px-6 bg-[#0B1B42] text-white relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="md:w-1/3">
             <h2 className="text-[100px] font-black leading-none tracking-tighter italic opacity-20">Voice.</h2>
             <p className="text-xl font-medium text-blue-400 mt-8 tracking-tight">The industry leaders on the ScreenerX transformation.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 gap-20">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeIn} className="relative">
                <Quote className="absolute -top-12 -left-12 w-24 h-24 text-white/5" />
                <p className="text-4xl font-bold leading-[1.1] mb-12">"{t.quote}"</p>
                <div className="flex items-center space-x-6">
                  <img src={t.img} alt={t.author} className="w-16 h-16 rounded-[1.5rem] grayscale" />
                  <div>
                    <p className="text-xl font-black tracking-tight">{t.author}</p>
                    <p className="text-sm text-blue-400 font-bold uppercase tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Footer */}
      <footer className="pt-64 pb-12 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              {...fadeIn}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-16"
            >
              <span>Intelligent Recruitment</span>
            </motion.div>

            {/* Simple Steps Flow */}
            <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-24 w-full scroll-mt-32">
              {[
                { icon: Briefcase, title: "Source", desc: "Define your ideal profile." },
                { icon: Cpu, title: "Analyze", desc: "AI screen resumes in seconds." },
                { icon: CheckCircle2, title: "Hire", desc: "Meet your top 1% matches." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center space-y-4 group"
                >
                  <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-[#0B1B42] uppercase tracking-widest">{step.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-[22vw] font-black leading-none tracking-[-0.08em] text-[#0B1B42] select-none italic"
            >
              ScreenerX
            </motion.h2>

            <div className="mt-32 w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-16 border-t border-gray-50">
              <div className="flex items-center space-x-12 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 shrink-0">
                   <img src="/screenerx-logo.png" alt="ScreenerX Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-black text-[#0B1B42] tracking-tighter">© 2026 ScreenerX</span>
              </div>

              <div className="flex items-center space-x-12 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Manifesto</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
