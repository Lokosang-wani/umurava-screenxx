"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protected-route";
import { fetchInterviewById, type InterviewDetails } from "@/lib/hiring-data";

export default function InterviewRoomPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const interviewId = params?.id;
  const hasValidInterviewId =
    typeof interviewId === "string" && interviewId.length > 0;
  const [interview, setInterview] = useState<InterviewDetails | null>(null);
  const [loading, setLoading] = useState(hasValidInterviewId);
  const [error, setError] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    if (!hasValidInterviewId) {
      return;
    }

    fetchInterviewById(interviewId)
      .then((data) => {
        setInterview(data);
      })
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load interview room.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hasValidInterviewId, interviewId]);

  const candidateName = interview?.candidate?.name ?? "Candidate";

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f4f8ff] px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-black/5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
                Interview Room
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {candidateName}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {interview?.job?.title ?? "Interview session"}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
            >
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white p-8 text-sm text-slate-500 shadow-sm ring-1 ring-black/5">
              Loading interview room...
            </div>
          ) : !hasValidInterviewId ? (
            <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-sm text-red-700 shadow-sm">
              Interview not found.
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          ) : (
            <>
              <section className="grid gap-6 lg:grid-cols-2">
                <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(43,116,240,0.35),_transparent_45%),linear-gradient(160deg,#0f172a,#111827_50%,#1e293b)]" />
                  <div className="relative flex h-[340px] flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">
                        Candidate
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold">
                        {candidateName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="text-sm text-slate-200">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-black/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(43,116,240,0.14),_transparent_35%)]" />
                  <div className="relative flex h-[340px] flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#2B74F0]">
                        Interviewer
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                        You
                      </h2>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      Camera preview placeholder
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-white px-6 py-5 shadow-sm ring-1 ring-black/5">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setMicEnabled((value) => !value)}
                    className={`inline-flex min-w-28 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      micEnabled
                        ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }`}
                  >
                    {micEnabled ? "Mic On" : "Mic Off"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraEnabled((value) => !value)}
                    className={`inline-flex min-w-28 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      cameraEnabled
                        ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }`}
                  >
                    {cameraEnabled ? "Camera On" : "Camera Off"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex min-w-28 items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    End Call
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
