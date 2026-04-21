"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function CandidateLoginPage() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectTo] = useState(() => {
    if (typeof window === "undefined") {
      return "/jobs";
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("redirectTo") || "/jobs";
  });

  useEffect(() => {
    if (user) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : "Failed to sign in",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8ff] px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
          Candidate Portal
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-500">
          Access your applications and apply to open roles.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
              placeholder="candidate@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2B74F0] px-4 py-3 font-semibold text-white transition hover:bg-[#1e57d4] disabled:bg-slate-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Need an account?{" "}
          <Link
            href={`/candidate/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
            className="font-semibold text-[#2B74F0] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
