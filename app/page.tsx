"use client";

import { useState } from "react";

export default function Home() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze CV");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-start py-16 px-8 bg-white">
        <h1 className="text-4xl font-bold mb-8 text-[#2B74F0]">
          Umarava AI Hackathon
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
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

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B74F0]"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !cvText}
            className="w-full bg-[#2B74F0] hover:bg-[#1e57d4] disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {loading ? "Analyzing..." : "Analyze CV"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 w-full space-y-6">
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
                    This candidate shows strong potential despite not being a
                    perfect match.
                  </p>
                </div>
              </div>
            )}

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-2">Match Score</div>
                <div className="text-4xl font-bold text-[#2B74F0]">
                  {result.analysis?.match_score}%
                </div>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-2">
                  Potential Score
                </div>
                <div className="text-4xl font-bold text-orange-500">
                  {result.analysis?.potential_score}%
                  <span className="text-2xl ml-2">🔥</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            {result.analysis?.skills && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.analysis.skills
                    .slice(0, 10)
                    .map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="bg-[#2B74F0] text-white text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  {result.analysis.skills.length > 10 && (
                    <span className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full">
                      +{result.analysis.skills.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Strengths */}
            {result.analysis?.strengths && (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-lg mb-3">✅ Strengths</h3>
                <ul className="space-y-2">
                  {result.analysis.strengths.map(
                    (strength: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">
                        <span className="font-semibold">•</span> {strength}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {result.analysis?.weaknesses && (
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-bold text-lg mb-3">⚠️ Areas to Develop</h3>
                <ul className="space-y-2">
                  {result.analysis.weaknesses.map(
                    (weakness: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">
                        <span className="font-semibold">•</span> {weakness}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Explanation */}
            {result.analysis?.explanation && (
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                <h3 className="font-bold text-lg mb-3">📊 Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.analysis.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
