"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { fetchPublishedJobs, type JobRow } from "@/lib/hiring-data";

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublishedJobs()
      .then((jobRows) => {
        setJobs(jobRows);
      })
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error ? loadError.message : "Failed to load jobs",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f8ff] px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-8 py-10 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
                Umarava Job Board
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                Discover your next role
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Browse published jobs, review the details, and apply directly
                through the candidate portal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/candidate/login"
                    className="inline-flex rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
                  >
                    Candidate Login
                  </Link>
                  <Link
                    href="/candidate/signup"
                    className="inline-flex rounded-xl bg-[#2B74F0] px-4 py-3 font-semibold text-white transition hover:bg-[#1e57d4]"
                  >
                    Candidate Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-black/5">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-black/5">
            No published jobs yet.
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2B74F0]">
                  Open Role
                </p>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  {job.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-500">
                  {job.description.length > 200
                    ? `${job.description.slice(0, 200)}...`
                    : job.description}
                </p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="mt-6 inline-flex w-fit rounded-xl bg-[#2B74F0] px-4 py-3 font-semibold text-white transition hover:bg-[#1e57d4]"
                >
                  View details
                </Link>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
