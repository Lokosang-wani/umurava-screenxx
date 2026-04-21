"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#2B74F0]">Dashboard</h1>
          <p className="mt-3 text-gray-600">
            This is a temporary dashboard so the auth flow has a stable landing
            page.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Signed in as {user?.email ?? "unknown user"}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-[#2B74F0] px-4 py-2 font-semibold text-white transition hover:bg-[#1e57d4]"
          >
            Back to analyzer
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}
