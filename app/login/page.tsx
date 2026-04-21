"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (user) {
      const userRole = (user.user_metadata as { role?: string }).role;
      if (userRole === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace(callbackUrl);
      }
    }
  }, [router, user, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 ring-1 ring-black/5">
          <div className="flex flex-col items-center mb-8">
            <Image 
              src="/umarava-logo.png" 
              alt="Umarava Logo" 
              width={315} 
              height={90} 
              className="h-[90px] w-auto mb-6"
              priority
            />
            <p className="text-slate-500">Welcome back! Please sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B74F0]/20 focus:border-[#2B74F0] transition placeholder:text-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B74F0]/20 focus:border-[#2B74F0] transition placeholder:text-slate-400"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B74F0] hover:bg-[#1e57d4] disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-500/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#2B74F0] hover:underline font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
