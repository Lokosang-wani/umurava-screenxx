'use client';
import { useState } from 'react';
import { Zap, Lock, AlertCircle, ChevronRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

const VALID_CODES: Record<string, string> = {
  'SX-9921': '1',
  'SX-4412': '2',
  'SX-7734': '3',
};

export default function PrivateGatePage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const formatCode = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
    if (cleaned.length > 2) return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setCode(formatCode(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1200));
    const jobId = VALID_CODES[code];
    if (jobId) {
      setSuccess(true);
      setTimeout(() => router.push(`/apply/${jobId}`), 900);
    } else {
      setError('This access code is invalid or has expired. Please check and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB] opacity-[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 shrink-0 mx-auto mb-6">
              <img src="/screenerx-logo.png" alt="ScreenerX Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Access granted!</h1>
            <p className="text-[#6B7280]">Loading your application...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Brand */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2.5 mb-8">
              <div className="w-10 h-10 shrink-0">
                <img src="/screenerx-logo.png" alt="ScreenerX Logo" className="w-full h-full object-contain" />
              </div>
                <span className="font-bold text-[#111827] text-xl">ScreenerX</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white border border-[#E4E8EF] text-[#6B7280] px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
                <Lock className="w-3 h-3" />
                Private Access Portal
              </div>

              <h1 className="text-3xl font-bold text-[#111827] mb-3">Enter your access code</h1>
              <p className="text-[#6B7280] leading-relaxed">
                Your recruiter has provided a unique code that unlocks a specific job application. Enter it below to get started.
              </p>
            </div>

            <div className="bg-white border border-[#E4E8EF] rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Access Code</label>
                  <div className="relative">
                    <input
                      type={showCode ? 'text' : 'password'}
                      value={code}
                      onChange={handleChange}
                      placeholder="SX-0000"
                      maxLength={7}
                      autoFocus
                      className={clsx(
                        "w-full text-center text-3xl font-bold tracking-[0.3em] py-5 px-6 rounded-xl border-2 bg-[#F5F7FA] focus:outline-none transition-all duration-200",
                        error
                          ? "border-red-300 text-red-700 focus:border-red-400"
                          : "border-[#E4E8EF] text-[#111827] focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
                      )}
                      style={{ fontFamily: 'inherit', letterSpacing: '0.3em' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                    >
                      {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={code.length < 7 || loading}
                  className={clsx(
                    "w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-200",
                    code.length === 7 && !loading
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-px"
                      : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Unlock Application
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* How it works */}
              <div className="mt-8 pt-6 border-t border-[#E4E8EF]">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">How it works</p>
                <div className="space-y-3">
                  {[
                    'Your recruiter shares a private 6-digit code (e.g. SX-9921).',
                    'Enter the code above to unlock the specific role.',
                    'Complete the AI-powered application form.',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] hover:text-[#6B7280] transition-colors group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Browse open opportunities instead
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
