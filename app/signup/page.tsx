"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth, type AuthRole } from "@/lib/auth-context";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AuthRole>("candidate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      const userRole = (user.user_metadata as { role?: string }).role;
      if (userRole === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, { role });

      if (result.needsEmailConfirmation) {
        setSuccessMessage(
          "Check your email to confirm your account. After confirmation, you will be redirected back and signed in automatically.",
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes("429")) {
          setError(
            "Too many signup attempts right now. Please wait a few minutes and try again.",
          );
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to sign up");
      }
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
            <p className="text-slate-500">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition ${
                  role === "candidate"
                    ? "bg-white text-[#2B74F0] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition ${
                  role === "admin"
                    ? "bg-white text-[#2B74F0] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Recruiter
              </button>
            </div>

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

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm font-medium">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B74F0] hover:bg-[#1e57d4] disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-500/20"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#2B74F0] hover:underline font-bold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
