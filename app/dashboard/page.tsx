"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  createInterview,
  fetchDashboardData,
  type CandidateRow,
  type DashboardData,
  updateCandidateStatus,
} from "@/lib/hiring-data";

interface CandidateListItem extends CandidateRow {
  jobTitle: string;
}

interface InterviewListItem {
  id: string;
  candidateName: string;
  scheduledAt: string;
  meetingLink: string | null;
  status: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateListItem | null>(null);
  const [inviteCandidate, setInviteCandidate] =
    useState<CandidateListItem | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const refreshDashboard = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchDashboardData(user.id);
      setDashboardData(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    fetchDashboardData(user.id)
      .then((data) => {
        setDashboardData(data);
      })
      .catch((loadError: unknown) => {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load dashboard data",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const candidates = dashboardData?.jobs.flatMap((job) =>
    job.candidates.map((candidate) => ({
      ...candidate,
      jobTitle: job.title,
    })),
  ) ?? ([] as CandidateListItem[]);

  const interviews =
    dashboardData?.jobs.flatMap((job) =>
      job.interviews.map((interview) => ({
        id: interview.id,
        candidateName:
          job.candidates.find(
            (candidate) => candidate.id === interview.candidate_id,
          )?.name ?? "Unknown Candidate",
        scheduledAt: interview.scheduled_at,
        meetingLink: interview.meeting_link,
        status: interview.status,
      })),
    ) ?? ([] as InterviewListItem[]);

  const getDecisionColor = (decision: CandidateRow["decision"]) => {
    switch (decision) {
      case "Strong Hire":
        return "text-green-700 bg-green-100";
      case "Consider":
        return "text-yellow-700 bg-yellow-100";
      case "Risky Hire":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusPill = (status: CandidateRow["status"] | InterviewListItem["status"]) => {
    switch (status) {
      case "hired":
      case "completed":
        return "bg-green-100 text-green-700";
      case "interview":
      case "scheduled":
        return "bg-blue-100 text-[#2B74F0]";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDateTime = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));

  const handleInviteSubmit = async () => {
    if (!inviteCandidate || !scheduledAt) {
      setError("Select a date and time before inviting a candidate.");
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      await createInterview({
        candidateId: inviteCandidate.id,
        jobId: inviteCandidate.job_id,
        scheduledAt: new Date(scheduledAt).toISOString(),
        meetingLink: meetingLink || null,
      });
      await updateCandidateStatus(inviteCandidate.id, "interview");
      setInviteCandidate(null);
      setScheduledAt("");
      setMeetingLink("");
      await refreshDashboard();
    } catch (inviteError) {
      setError(
        inviteError instanceof Error
          ? inviteError.message
          : "Failed to invite candidate to interview",
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="rounded-3xl bg-white px-6 py-7 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2B74F0]">
                Hiring Overview
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Recruiter Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Track applicants, move strong candidates into interviews, and
                keep hiring momentum visible in one place.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#2B74F0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e57d4]"
            >
              Analyze New Candidate
            </Link>
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-700 shadow-sm">
            {error}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-medium text-slate-500">Total Applied</p>
            <p className="mt-4 text-4xl font-bold text-slate-900">
              {dashboardData?.stats.totalCandidates ?? 0}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Candidates currently saved in the pipeline.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-medium text-slate-500">Total Interviews</p>
            <p className="mt-4 text-4xl font-bold text-[#2B74F0]">
              {dashboardData?.stats.interviewCandidates ?? 0}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Candidates currently in the interview stage.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-medium text-slate-500">Total Hired</p>
            <p className="mt-4 text-4xl font-bold text-slate-900">
              {dashboardData?.stats.hiredCandidates ?? 0}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Candidates marked as hired.
            </p>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.65fr_1fr]">
          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Candidates
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review scores and move promising candidates into interviews.
              </p>
            </div>

            {loading ? (
              <div className="p-6 text-sm text-slate-500">
                Loading candidates...
              </div>
            ) : candidates.length === 0 ? (
              <div className="p-6 text-sm text-slate-500">
                No candidates yet. Analyze a CV to populate the table.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Score</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="align-top">
                        <td className="px-6 py-5">
                          <div className="font-semibold text-slate-900">
                            {candidate.name}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {candidate.jobTitle}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 font-semibold text-[#2B74F0]">
                            {candidate.match_score}%
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 font-medium capitalize ${getStatusPill(
                              candidate.status,
                            )}`}
                          >
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(candidate)}
                              className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-[#2B74F0] hover:text-[#2B74F0]"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setInviteCandidate(candidate)}
                              className="rounded-xl bg-[#2B74F0] px-4 py-2 font-medium text-white transition hover:bg-[#1e57d4]"
                            >
                              Invite to Interview
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Interviews
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Upcoming meetings and quick access to join links.
              </p>
            </div>

            {loading ? (
              <div className="p-6 text-sm text-slate-500">
                Loading interviews...
              </div>
            ) : interviews.length === 0 ? (
              <div className="p-6 text-sm text-slate-500">
                No interviews scheduled yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {interviews.map((interview) => (
                  <div key={interview.id} className="space-y-3 px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {interview.candidateName}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {formatDateTime(interview.scheduledAt)}
                        </div>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusPill(
                          interview.status,
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">
                      {interview.meetingLink ?? "Meeting link not added yet."}
                    </div>
                    {interview.meetingLink ? (
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-xl border border-[#2B74F0] px-4 py-2 font-medium text-[#2B74F0] transition hover:bg-blue-50"
                      >
                        Join
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {selectedCandidate ? (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedCandidate.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCandidate.jobTitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Match Score
                  </div>
                  <div className="mt-2 text-2xl font-bold text-[#2B74F0]">
                    {selectedCandidate.match_score}%
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Potential
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {selectedCandidate.potential_score}%
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Decision
                  </div>
                  <div
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getDecisionColor(
                      selectedCandidate.decision,
                    )}`}
                  >
                    {selectedCandidate.decision}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Strengths
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCandidate.strengths.length > 0 ? (
                      selectedCandidate.strengths.map((strength) => (
                        <span
                          key={strength}
                          className="rounded-full bg-blue-50 px-3 py-1 text-sm text-[#2B74F0]"
                        >
                          {strength}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No strengths saved.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Weaknesses
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCandidate.weaknesses.length > 0 ? (
                      selectedCandidate.weaknesses.map((weakness) => (
                        <span
                          key={weakness}
                          className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                        >
                          {weakness}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No weaknesses saved.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    CV Snapshot
                  </h4>
                  <p className="mt-3 max-h-40 overflow-y-auto rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {selectedCandidate.cv_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {inviteCandidate ? (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Invite to Interview
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Schedule an interview for {inviteCandidate.name}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInviteCandidate(null)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Interview date and time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#2B74F0]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Meeting link
                  </label>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(event) => setMeetingLink(event.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#2B74F0]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInviteCandidate(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleInviteSubmit()}
                  disabled={actionLoading}
                  className="rounded-xl bg-[#2B74F0] px-4 py-2 font-medium text-white transition hover:bg-[#1e57d4] disabled:bg-slate-300"
                >
                  {actionLoading ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
