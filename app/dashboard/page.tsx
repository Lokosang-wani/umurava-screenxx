"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import {
  fetchDashboardData,
  type CandidateRow,
  type DashboardData,
} from "@/lib/hiring-data";

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadDashboard = async () => {
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

    void loadDashboard();
  }, [user]);

  const candidates = dashboardData?.jobs.flatMap((job) =>
    job.candidates.map((candidate) => ({
      ...candidate,
      jobTitle: job.title,
    })),
  ) ?? [];

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

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#2B74F0]">Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Signed in as {user?.email ?? "unknown user"}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex rounded-lg bg-[#2B74F0] px-4 py-2 font-semibold text-white transition hover:bg-[#1e57d4]"
            >
              Analyze another CV
            </Link>
          </div>

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Jobs</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {dashboardData?.stats.totalJobs ?? 0}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Candidates</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {dashboardData?.stats.totalCandidates ?? 0}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Interviews</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {dashboardData?.stats.interviewCandidates ?? 0}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Hired</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {dashboardData?.stats.hiredCandidates ?? 0}
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Candidate List
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Newly analyzed candidates appear here after they are saved.
              </p>
            </div>

            {loading ? (
              <div className="p-6 text-gray-500">Loading candidates...</div>
            ) : candidates.length === 0 ? (
              <div className="p-6 text-gray-500">
                No candidates yet. Analyze a CV to add the first one.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="grid gap-4 px-6 py-5 md:grid-cols-[1.5fr_1fr_1fr_auto]"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {candidate.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Job: {candidate.jobTitle}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Status: {candidate.status}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Match</div>
                      <div className="text-lg font-semibold text-[#2B74F0]">
                        {candidate.match_score}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Potential</div>
                      <div className="text-lg font-semibold text-orange-500">
                        {candidate.potential_score}%
                      </div>
                    </div>
                    <div className="flex items-start md:justify-end">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getDecisionColor(
                          candidate.decision,
                        )}`}
                      >
                        {candidate.decision}
                      </span>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-sm font-medium text-gray-700">
                        Strengths
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {candidate.strengths.length > 0
                          ? candidate.strengths.join(", ")
                          : "No strengths saved."}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-sm font-medium text-gray-700">
                        Weaknesses
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {candidate.weaknesses.length > 0
                          ? candidate.weaknesses.join(", ")
                          : "No weaknesses saved."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
