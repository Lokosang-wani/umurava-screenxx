"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  fetchOwnCandidateProfile,
  fetchOwnProfile,
  fetchPublishedJobById,
  submitApplication,
  updateOwnProfile,
  uploadCandidateCv,
  upsertCandidateProfile,
  type CandidateProfileRow,
  type JobRow,
} from "@/lib/hiring-data";

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const jobId = params?.id;
  const hasValidJobId = typeof jobId === "string" && jobId.length > 0;
  const [job, setJob] = useState<JobRow | null>(null);
  const [candidateProfile, setCandidateProfile] =
    useState<CandidateProfileRow | null>(null);
  const [loading, setLoading] = useState(hasValidJobId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [cvText, setCvText] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (!hasValidJobId) {
      return;
    }

    fetchPublishedJobById(jobId)
      .then((jobData) => {
        setJob(jobData);
      })
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error ? loadError.message : "Failed to load job",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hasValidJobId, jobId]);

  useEffect(() => {
    if (!user) {
      return;
    }

    Promise.all([
      fetchOwnProfile(user.id).catch(() => null),
      fetchOwnCandidateProfile(user.id).catch(() => null),
    ]).then(([profileData, candidateProfileData]) => {
      setCandidateProfile(candidateProfileData);
      setFullName(profileData?.full_name ?? "");
      setAge(candidateProfileData?.age?.toString() ?? "");
      setAddress(candidateProfileData?.address ?? "");
      setCvText(candidateProfileData?.default_cv_text ?? "");
    });
  }, [user]);

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!user) {
      setError("Please sign in as a candidate before applying.");
      return;
    }

    if (!job) {
      setError("Job details are not available.");
      return;
    }

    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!cvText.trim() && !cvFile) {
      setError("Paste your CV text or upload a PDF before applying.");
      return;
    }

    setSubmitting(true);

    try {
      await updateOwnProfile({
        userId: user.id,
        fullName: fullName.trim(),
      });

      const cvFileUrl =
        cvFile != null ? await uploadCandidateCv(user.id, cvFile) : null;

      const savedCandidateProfile = await upsertCandidateProfile({
        userId: user.id,
        age: age ? Number(age) : null,
        address: address.trim() || null,
        defaultCvText: cvText.trim() || null,
        defaultCvFileUrl: cvFileUrl,
      });

      await submitApplication({
        candidateProfileId: savedCandidateProfile.id,
        jobId: job.id,
        cvText: cvText.trim() || null,
        cvFileUrl,
      });

      setCandidateProfile(savedCandidateProfile);
      setSuccessMessage(
        "Application received. You will be notified when a hiring decision is made.",
      );
    } catch (applyError) {
      setError(
        applyError instanceof Error
          ? applyError.message
          : "Failed to submit application",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const authRedirect = `/candidate/login?redirectTo=${encodeURIComponent(
    `/jobs/${params?.id ?? ""}`,
  )}`;

  return (
    <main className="min-h-screen bg-[#f4f8ff] px-6 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <Link
            href="/jobs"
            className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
          >
            Back to jobs
          </Link>

          {loading ? (
            <p className="mt-6 text-sm text-slate-500">Loading job...</p>
          ) : !hasValidJobId ? (
            <p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              Job not found.
            </p>
          ) : error && !job ? (
            <p className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          ) : job ? (
            <>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
                Published Role
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                {job.title}
              </h1>
              <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-6 text-sm leading-7 text-slate-600 whitespace-pre-wrap">
                {job.description}
              </div>
            </>
          ) : null}
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
            Apply Now
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Submit your application
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your details, paste your CV, or upload a PDF.
          </p>

          {!user ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              Sign in as a candidate to apply.
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={authRedirect}
                  className="rounded-xl bg-[#2B74F0] px-4 py-2 font-semibold text-white transition hover:bg-[#1e57d4]"
                >
                  Candidate login
                </Link>
                <Link
                  href={`/candidate/signup?redirectTo=${encodeURIComponent(
                    `/jobs/${params?.id ?? ""}`,
                  )}`}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
                >
                  Candidate signup
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApply} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Age
                  </label>
                  <input
                    type="number"
                    min="16"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Paste CV text
                </label>
                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  className="h-40 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#2B74F0]"
                  placeholder="Paste your CV here..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Upload PDF CV
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) =>
                    setCvFile(event.target.files?.[0] ?? null)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-[#2B74F0] hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Uploads use the `candidate-cvs` Supabase Storage bucket.
                </p>
              </div>

              {candidateProfile?.default_cv_file_url ? (
                <p className="text-xs text-slate-500">
                  Existing uploaded CV on file will be replaced only if you add a
                  new PDF now.
                </p>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-700">
                  {successMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[#2B74F0] px-4 py-3 font-semibold text-white transition hover:bg-[#1e57d4] disabled:bg-slate-300"
              >
                {submitting ? "Submitting..." : "Submit application"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
