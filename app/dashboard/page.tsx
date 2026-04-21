"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  createInterview,
  fetchDashboardData,
  fetchOwnCandidateProfile,
  fetchCandidateDashboardData,
  type CandidateDashboardData,
  type CandidateRow,
  type DashboardData,
  type InterviewStatus,
  updateCandidateStatus,
  updateInterviewStatus,
} from "@/lib/hiring-data";
import DashboardStats from "@/components/dashboard-stats";
import ApplicationStatusTracker from "@/components/application-status-tracker";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Sparkles, 
  Calendar, 
  Video, 
  Info,
  User as UserIcon,
  ChevronRight
} from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  scheduledAt: string;
  status: InterviewStatus;
  meetingLink: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [candidateDashboard, setCandidateDashboard] = useState<CandidateDashboardData | null>(null);
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Modal / Selection State
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRow | null>(null);
  const [inviteCandidate, setInviteCandidate] = useState<CandidateRow | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const role = (user?.user_metadata as { role?: string })?.role ?? "candidate";

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      try {
        if (role === "admin") {
          const data = await fetchDashboardData(user.id);
          setDashboardData(data);
          setCandidates(data.candidates);
          setInterviews(data.interviews as Interview[]);
        } else {
          const data = await fetchCandidateDashboardData(user.id);
          setCandidateDashboard(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, role]);

  const handleMarkHired = async (candidateId: string) => {
    setActionLoading(true);
    try {
      await updateCandidateStatus(candidateId, "hired");
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? { ...c, status: "hired" } : c))
      );
      if (dashboardData) {
        setDashboardData({
          ...dashboardData,
          stats: {
            ...dashboardData.stats,
            hiredCandidates: dashboardData.stats.hiredCandidates + 1,
          },
        });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleInviteSubmit = async () => {
    if (!inviteCandidate || !scheduledAt) return;
    setActionLoading(true);
    try {
      const newInterview = await createInterview({
        candidateId: inviteCandidate.id,
        recruiterId: user!.id,
        scheduledAt,
        meetingLink: meetingLink || null,
        candidateName: inviteCandidate.name,
      });

      await updateCandidateStatus(inviteCandidate.id, "interviewing");
      
      setInterviews((prev) => [newInterview as Interview, ...prev]);
      setCandidates((prev) =>
        prev.map((c) => (c.id === inviteCandidate.id ? { ...c, status: "interviewing" } : c))
      );
      
      if (dashboardData) {
        setDashboardData({
          ...dashboardData,
          stats: {
            ...dashboardData.stats,
            interviewCandidates: dashboardData.stats.interviewCandidates + 1,
          },
        });
      }

      setInviteCandidate(null);
      setScheduledAt("");
      setMeetingLink("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to schedule interview");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteInterview = async (interview: Interview) => {
    setActionLoading(true);
    try {
      await updateInterviewStatus(interview.id, "completed");
      setInterviews((prev) =>
        prev.map((i) => (i.id === interview.id ? { ...i, status: "completed" as InterviewStatus } : i))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update interview");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
      case "interviewing":
        return "bg-blue-50 text-[#2B74F0] ring-1 ring-[#2B74F0]/20";
      default:
        return "bg-slate-50 text-slate-600 ring-1 ring-slate-600/20";
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision?.toLowerCase()) {
      case "hire":
        return "bg-emerald-100 text-emerald-800";
      case "consider":
        return "bg-blue-100 text-[#2B74F0]";
      case "reject":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (role === "candidate") {
    const stats = {
      totalApplied: candidateDashboard?.applications.length ?? 0,
      inProgress: candidateDashboard?.applications.filter(a => a.status !== "hired" && a.status !== "rejected").length ?? 0,
      interviews: candidateDashboard?.interviews.length ?? 0,
      offers: candidateDashboard?.applications.filter(a => a.status === "hired").length ?? 0,
    };

    return (
      <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          {/* Welcome Header */}
          <section className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative z-10">
              <span className="text-xs font-bold text-[#2B74F0] uppercase tracking-[0.2em] mb-3 block">Candidate Portal</span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Welcome back, <span className="text-[#2B74F0]">{user?.user_metadata?.full_name?.split(' ')[0] || 'Alex'}</span>.
              </h1>
              <p className="mt-4 text-lg text-slate-500 font-medium">
                Here is an overview of your recent job seeking activity.
              </p>
            </div>
            <div className="hidden lg:block relative">
               <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-[#2B74F0] shadow-inner">
                 <Rocket className="w-10 h-10" />
               </div>
            </div>
          </section>

          {/* Quick Stats */}
          <DashboardStats stats={stats} />

          {/* Bento Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Active Applications */}
            <section className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-slate-900">Active Applications</h2>
                <Link href="/" className="text-sm font-bold text-[#2B74F0] hover:underline">Browse More Jobs</Link>
              </div>

              {loading ? (
                <div className="h-64 bg-white rounded-[2rem] border border-slate-100 animate-pulse flex items-center justify-center text-slate-300">Loading applications...</div>
              ) : candidateDashboard?.applications.length === 0 ? (
                <div className="bg-white p-16 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">No active applications yet</h3>
                  <p className="text-slate-500 mb-8">Start your journey today by applying to your first role.</p>
                  <Link href="/" className="bg-[#2B74F0] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
                    Find Your Next Role
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidateDashboard?.applications.filter(a => a.status !== "rejected" && a.status !== "hired").map((app) => (
                    <motion.div 
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#2B74F0] bg-blue-50 px-3 py-1 rounded-full">Full-time</span>
                          <span className="text-xs font-bold text-slate-400">Applied on {new Date(app.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#2B74F0] transition-colors">{app.job.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 font-medium italic">Remote Position • USD Competitive</p>
                      </div>
                      <ApplicationStatusTracker status={app.status} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* History Table */}
              {candidateDashboard?.applications.some(a => a.status === "rejected" || a.status === "hired") && (
                <div className="mt-12 bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-50">
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Application History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <tr>
                          <th className="px-6 py-4">Position</th>
                          <th className="px-6 py-4">Applied Date</th>
                          <th className="px-6 py-4">Final Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {candidateDashboard.applications.filter(a => a.status === "rejected" || a.status === "hired").map(app => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-900 text-sm">{app.job.title}</td>
                            <td className="px-6 py-4 text-slate-500 text-xs">{new Date(app.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                app.status === "hired" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                              }`}>
                                {app.status === "hired" ? "Hired" : "Closed"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* Sidebar Columns: Interviews & Profile Summary */}
            <section className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calendar className="w-24 h-24 text-white" strokeWidth={1} />
                </div>
                <h2 className="text-2xl font-black mb-6 relative z-10 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Upcoming Interviews
                </h2>
                
                {candidateDashboard?.interviews.length === 0 ? (
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">No interviews scheduled yet. We&apos;ll notify you when a recruiter invites you.</p>
                ) : (
                  <div className="space-y-4">
                    {candidateDashboard?.interviews.map(interview => (
                      <div key={interview.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition group-card">
                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">{new Date(interview.scheduled_at).toLocaleDateString()}</p>
                        <h4 className="font-bold text-lg mb-4">{interview.job.title}</h4>
                        <div className="flex gap-2">
                          <Link 
                            href={interview.meeting_link || '#'} 
                            className="flex-1 bg-[#2B74F0] text-center py-3 rounded-xl text-xs font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2"
                          >
                            <Video className="w-3 h-3" />
                            Join Call
                          </Link>
                          <Link 
                            href={`/interviews/${interview.id}`} 
                            className="px-5 bg-white/10 text-center py-3 rounded-xl text-xs font-bold hover:bg-white/20 transition flex items-center justify-center gap-2"
                          >
                            <Info className="w-3 h-3" />
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-xs text-slate-400 font-medium italic">&quot;Success is where preparation and opportunity meet.&quot;</p>
                </div>
              </div>

              {/* Profile Snapshot */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-lg hover:shadow-slate-200/50">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6 font-primary uppercase tracking-widest text-xs flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  Profile Snapshot
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-[#2B74F0] shadow-inner">
                    <UserIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg uppercase leading-tight tracking-tight">{user?.user_metadata?.full_name || 'Candidate Name'}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resume Analysis</p>
                     <p className="text-sm font-bold text-slate-900 flex items-center justify-between">
                       AI Match Score
                       <span className="text-[#2B74F0] bg-blue-50 px-2 py-0.5 rounded-lg">84/100</span>
                     </p>
                   </div>
                   <button className="w-full py-4 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                     Update My Profile
                     <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    );
  }

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
              href="/dashboard/analyze"
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
                              disabled={actionLoading || candidate.status === "hired"}
                              className="rounded-xl bg-[#2B74F0] px-4 py-2 font-medium text-white transition hover:bg-[#1e57d4]"
                            >
                              Invite to Interview
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleMarkHired(candidate.id)}
                              disabled={actionLoading || candidate.status === "hired"}
                              className="rounded-xl border border-emerald-200 px-4 py-2 font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Mark as Hired
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
                    <div className="flex flex-wrap gap-3">
                      {interview.meetingLink ? (
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Open Link
                        </a>
                      ) : null}
                      <Link
                        href={`/interview/${interview.id}`}
                        className="inline-flex rounded-xl border border-[#2B74F0] px-4 py-2 font-medium text-[#2B74F0] transition hover:bg-blue-50"
                      >
                        Join
                      </Link>
                      {interview.status !== "completed" ? (
                        <button
                          type="button"
                          onClick={() => void handleCompleteInterview(interview)}
                          disabled={actionLoading}
                          className="inline-flex rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Mark Completed
                        </button>
                      ) : null}
                    </div>
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
