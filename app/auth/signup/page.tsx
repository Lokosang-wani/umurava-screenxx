'use client';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Mail, Lock, User, Briefcase, Sparkles, Cpu, Code, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: ''
  });

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Onboarding Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block space-y-12"
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 shrink-0 transition-transform group-hover:scale-110">
              <img src="/screenerx-logo.png" alt="ScreenerX Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#0B1B42]">ScreenerX</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-6xl font-black text-[#0B1B42] leading-[0.95] tracking-tighter">
              Join the <br />
              <span className="text-blue-600 italic">Intelligence.</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-sm">
              Deploy the neural screening engine for your company and find the top 1% in seconds.
            </p>
          </div>

          <div className="space-y-6">
             {[
               "Autonomous CV Evaluation",
               "Neural Match Scoring",
               "Zero-Bias Screening",
               "Instant Shortlist Reports"
             ].map((text, i) => (
               <div key={i} className="flex items-center space-x-3">
                 <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                   <CheckCircle2 className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-bold text-[#0B1B42] uppercase tracking-widest">{text}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Right Side: Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
            <div className="text-center lg:hidden mb-10">
               <img src="/screenerx-logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
               <h2 className="text-3xl font-black text-[#0B1B42] tracking-tighter italic">Join the Hub.</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-black text-[#0B1B42] tracking-tighter hidden lg:block italic">Initialize Account</h2>
                <p className="text-gray-400 font-medium">Ready to transform your recruitment?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group col-span-2 md:col-span-1">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative group col-span-2 md:col-span-1">
                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="relative group col-span-2">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Work Email"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative group col-span-2">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Set Password"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                  By initializing, you agree to the <a href="#" className="text-blue-600">Neural Service Agreement</a> and <a href="#" className="text-blue-600">Privacy Manifesto</a>.
                </p>
              </div>

              <Link href="/dashboard" className="block">
                <button className="w-full py-5 bg-[#0B1B42] text-white rounded-[1.5rem] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] group">
                  Deploy Account
                  <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>

              <p className="text-center text-sm font-medium text-gray-400">
                Already have an account? <Link href="/auth/signin" className="text-blue-600 font-black hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
