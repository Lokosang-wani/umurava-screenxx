"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { fetchPublishedJobById, type JobRow } from "@/lib/hiring-data";
import Link from "next/link";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const jobId = params.id as string;
    if (!jobId) return;

    const loadJob = async () => {
      try {
        const data = await fetchPublishedJobById(jobId);
        if (!data) {
          setError("Job position not found.");
        } else {
          setJob(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [params.id]);

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

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <Navbar />
        <div className="mx-auto max-w-3xl pt-32 px-4 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Oops!</h2>
            <p className="text-slate-500 mb-8">{error || "This job may no longer be available."}</p>
            <Link href="/" className="bg-[#2B74F0] text-white px-6 py-3 rounded-xl font-semibold">
              Back to Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Navbar />

      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-black/5 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2B74F0] bg-blue-50 px-3 py-1 rounded-full text-center">
                    Full-time
                  </span>
                  <span className="text-xs text-slate-400">
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h1>
              </div>
              <Link
                href={`/jobs/${job.id}/apply`}
                className="bg-[#2B74F0] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-lg shadow-blue-500/20 text-center"
              >
                Apply for this Role
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm ring-1 ring-black/5">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Job Description
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col gap-6">
              <h3 className="font-bold text-slate-900">Interested in this position?</h3>
              <p className="text-sm text-slate-500">
                Submit your application and our AI recruiter will analyze your profile against the job requirements instantly.
              </p>
              <div className="flex gap-4">
                <Link
                  href={`/jobs/${job.id}/apply`}
                  className="bg-[#2B74F0] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1e57d4] transition shadow-lg shadow-blue-500/20 flex-1 md:flex-initial text-center"
                >
                  Quick Apply
                </Link>
                <button 
                  onClick={() => router.back()}
                  className="px-8 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition border border-slate-200 flex-1 md:flex-initial"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
