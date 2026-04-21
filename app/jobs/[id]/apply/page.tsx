"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { 
  fetchPublishedJobById, 
  submitApplication, 
  upsertCandidateProfile,
  fetchOwnCandidateProfile,
  type JobRow 
} from "@/lib/hiring-data";
import Link from "next/link";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<JobRow | null>(null);
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const jobId = params.id as string;
    if (!jobId) return;

    const loadData = async () => {
      try {
        const [jobData, profileData] = await Promise.all([
          fetchPublishedJobById(jobId),
          user ? fetchOwnCandidateProfile(user.id) : null
        ]);

        if (!jobData) {
          setError("Job position not found.");
        } else {
          setJob(jobData);
        }

        if (profileData?.default_cv_text) {
          setCvText(profileData.default_cv_text);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !job) return;

    setSubmitting(true);
    setError("");

    try {
      // 1. Ensure user has a candidate profile
      const profile = await upsertCandidateProfile({
        userId: user.id,
        defaultCvText: cvText,
      });

      // 2. Submit the application
      await submitApplication({
        candidateProfileId: profile.id,
        jobId: job.id,
        cvText,
      });

      setSuccess(true);
      // Wait a bit then redirect
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-10 h-10 border-4 border-[#2B74F0] border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <Navbar />
        <div className="mx-auto max-w-3xl pt-32 px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Error</h2>
            <p className="text-slate-500 mb-8">{error || "Could not find job details."}</p>
            <Link href="/" className="bg-[#2B74F0] text-white px-6 py-3 rounded-xl font-semibold">
              Back to Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f7f9fc]">
        <Navbar />

        <main className="pt-24 pb-16 px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            {success ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl ring-1 ring-black/5 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Application Submitted!</h2>
                <p className="text-slate-500 mb-8 max-w-sm">
                  We&apos;ve received your application for <strong>{job.title}</strong>. 
                  Our team will review it and get back to you soon.
                </p>
                <Link href="/" className="text-[#2B74F0] font-bold hover:underline">
                  Return to Job Board
                </Link>
                <p className="text-xs text-slate-400 mt-6">
                  Redirecting in a few seconds...
                </p>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl ring-1 ring-black/5">
                <div className="mb-10 text-center md:text-left">
                  <h1 className="text-3xl font-extrabold text-slate-900">Apply for Role</h1>
                  <p className="text-slate-500 mt-2">
                    Submit your application for <span className="font-bold text-slate-900">{job.title}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Resume / Professional Summary
                    </label>
                    <textarea
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      placeholder="Paste your CV text or a detailed professional summary here..."
                      className="w-full h-80 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2B74F0]/20 focus:border-[#2B74F0] transition placeholder:text-slate-400 text-slate-700 leading-relaxed"
                      required
                    />
                    <p className="mt-3 text-xs text-slate-400">
                      Your summary will be analyzed by our AI to find the best match for the role.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitting || !cvText}
                      className="w-full sm:w-auto flex-1 bg-[#2B74F0] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-lg shadow-blue-500/20 disabled:bg-slate-300"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition border border-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
