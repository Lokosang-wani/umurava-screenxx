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
          <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
            <pre className="bg-white p-3 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
