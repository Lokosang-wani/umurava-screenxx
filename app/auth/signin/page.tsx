'use client';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Mail, Lock, Sparkles, Cpu, Code, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Branding & Value */}
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
              Welcome to the <br />
              <span className="text-blue-600 italic">Neural Core.</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-sm">
              Access your recruitment intelligence dashboard and start screening with precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Cpu, label: "94% Accuracy" },
              { icon: Sparkles, label: "Instant Matches" }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center space-x-3 shadow-sm">
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-[#0B1B42] uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
            <div className="text-center lg:hidden mb-10">
               <img src="/screenerx-logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
               <h2 className="text-3xl font-black text-[#0B1B42] tracking-tighter italic">Enter the Future.</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-black text-[#0B1B42] tracking-tighter hidden lg:block italic">Sign In</h2>
                <p className="text-gray-400 font-medium">Enter your credentials to access the hub.</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Work Email"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border border-transparent rounded-2xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest px-1">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-[#0B1B42] transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot?</a>
              </div>

              <Link href="/dashboard" className="block">
                <button className="w-full py-5 bg-[#0B1B42] text-white rounded-[1.5rem] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] group">
                  Enter the Hub
                  <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-4 bg-white/0 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-[#0B1B42]">
                  <Code className="w-5 h-5" />
                  <span>GitHub</span>
                </button>
                <button className="flex items-center justify-center space-x-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-[#0B1B42]">
                  <Globe className="w-5 h-5" />
                  <span>SSO</span>
                </button>
              </div>

              <p className="text-center text-sm font-medium text-gray-400">
                Don't have an account? <Link href="/auth/signup" className="text-blue-600 font-black hover:underline">Sign Up Free</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
