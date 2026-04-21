"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { addCandidate, fetchJobsForUser, type JobRow } from "@/lib/hiring-data";

interface AnalysisResult {
  match_score: number;
  potential_score: number;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  transferable_skills: string[];
  decision: "Strong Hire" | "Consider" | "Risky Hire";
  explanation: string;
}

interface AnalyzeResponse {
  analysis: AnalysisResult;
}

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [cvText, setCvText] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState("");
  const [displayedExplanation, setDisplayedExplanation] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadJobs = async () => {
      setJobsLoading(true);

      try {
        const jobRows = await fetchJobsForUser(user.id);
        setJobs(jobRows);
        setSelectedJobId((current) => current || jobRows[0]?.id || "");
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Failed to load jobs",
        );
      } finally {
        setJobsLoading(false);
      }
    };

    void loadJobs();
  }, [user]);

  // Typing effect for explanation
  useEffect(() => {
    if (!result?.analysis?.explanation) return;

    const text = result.analysis.explanation;
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedExplanation(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [result]);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;

  const deriveCandidateName = () => {
    const firstNonEmptyLine = cvText
      .split("\n")
      .map((line) => line.trim())
      .find(Boolean);

    if (!firstNonEmptyLine) {
      return "Unnamed Candidate";
    }

    return firstNonEmptyLine.slice(0, 120);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJob || !user) {
      setError("Please select a job before analyzing a candidate.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setDisplayedExplanation("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          jobDescription: selectedJob.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze CV");
      }

      const data: AnalyzeResponse = await response.json();
      setResult(data);

      await addCandidate({
        name: deriveCandidateName(),
        cvText,
        jobId: selectedJob.id,
        matchScore: data.analysis.match_score,
        potentialScore: data.analysis.potential_score,
        strengths: data.analysis.strengths,
        weaknesses: data.analysis.weaknesses,
        decision: data.analysis.decision,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Strong Hire":
        return "bg-green-100 border-green-400 text-green-700";
      case "Consider":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "Risky Hire":
        return "bg-red-100 border-red-400 text-red-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  const getDecisionEmoji = (decision: string) => {
    switch (decision) {
      case "Strong Hire":
        return "🟢";
      case "Consider":
        return "🟡";
      case "Risky Hire":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col flex-1 items-center justify-center bg-white">
        <main className="flex flex-1 w-full max-w-4xl flex-col items-start justify-start py-16 px-8 bg-white">
          <h1 className="text-4xl font-bold mb-2 text-[#2B74F0]">
            Umarava AI Hackathon
          </h1>
          <p className="text-gray-600 mb-8">
            Smart candidate analysis powered by AI
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Job</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                disabled={jobsLoading || jobs.length === 0}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#2B74F0]"
                required
              >
                <option value="">
                  {jobsLoading
                    ? "Loading jobs..."
                    : jobs.length === 0
                      ? "No jobs available"
                      : "Choose a job"}
                </option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
              {selectedJob && (
                <p className="mt-2 text-sm text-gray-500">
                  {selectedJob.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CV</label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste the candidate's CV here..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B74F0]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !cvText || !selectedJobId || jobsLoading}
              className="w-full bg-[#2B74F0] hover:bg-[#1e57d4] disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading && <span className="inline-block animate-spin">⚙️</span>}
              {loading ? "Analyzing and saving candidate..." : "Analyze CV"}
            </button>
          </form>

          {jobs.length === 0 && !jobsLoading && (
            <div className="mt-6 w-full rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
              Create at least one job in Supabase before screening candidates.
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 w-full space-y-6">
            {/* Decision Card - Most Important */}
              {result.analysis?.decision && (
                <div
                  className={`border-2 rounded-lg p-6 ${getDecisionColor(
                    result.analysis.decision,
                  )}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">
                      {getDecisionEmoji(result.analysis.decision)}
                    </span>
                    <h3 className="font-bold text-2xl">
                      {result.analysis.decision}
                    </h3>
                  </div>
                </div>
              )}

            {/* Hidden Gem Badge */}
              {result.analysis?.potential_score >
                result.analysis?.match_score && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-50 border-2 border-green-400 rounded-lg p-4 flex items-center gap-3">
                  <span className="text-3xl">💎</span>
                  <div>
                    <h3 className="font-bold text-green-700">
                      Hidden Gem Candidate
                    </h3>
                    <p className="text-sm text-green-600">
                      Strong potential despite not being a perfect match.
                    </p>
                  </div>
                </div>
              )}

            {/* Score Cards with Progress Bars */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Match Score</div>
                  <div className="text-4xl font-bold text-[#2B74F0] mb-3">
                    {result.analysis?.match_score}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${result.analysis?.match_score}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Potential Score
                  </div>
                  <div className="text-4xl font-bold text-orange-500 mb-3">
                    {result.analysis?.potential_score}%
                    <span className="text-2xl ml-2">🔥</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${result.analysis?.potential_score}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

            {/* Strengths */}
              {result.analysis?.strengths?.length > 0 && (
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="font-bold text-lg mb-3">✅ Strengths</h3>
                  <ul className="space-y-2">
                    {result.analysis.strengths.map(
                      (strength: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700">
                          <span className="font-semibold text-green-600">✓</span>{" "}
                          {strength}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

            {/* Weaknesses */}
              {result.analysis?.weaknesses?.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="font-bold text-lg mb-3">⚠️ Areas to Develop</h3>
                  <ul className="space-y-2">
                    {result.analysis.weaknesses.map(
                      (weakness: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700">
                          <span className="font-semibold text-yellow-600">!</span>{" "}
                          {weakness}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

            {/* Missing Skills */}
              {result.analysis?.missing_skills?.length > 0 && (
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <h3 className="font-bold text-lg mb-3">🎯 Skills to Acquire</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.missing_skills.map(
                      (skill: string, i: number) => (
                        <span
                          key={i}
                          className="bg-red-200 text-red-700 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Transferable Skills */}
              {result.analysis?.transferable_skills?.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-bold text-lg mb-3">
                    🔄 Transferable Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.transferable_skills.map(
                      (skill: string, i: number) => (
                        <span
                          key={i}
                          className="bg-purple-300 text-purple-800 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* AI Explanation - MOST IMPORTANT */}
              {result.analysis?.explanation && (
                <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-300">
                  <h3 className="font-bold text-lg mb-3">🧠 AI Analysis</h3>
                  <p className="text-gray-800 leading-relaxed">
                    {displayedExplanation}
                    {displayedExplanation.length <
                      result.analysis.explanation.length && (
                      <span className="animate-pulse">▌</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
