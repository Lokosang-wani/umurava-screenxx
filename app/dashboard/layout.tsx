"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f7f9fc]">
        <Navbar />
        <Sidebar />
        <div className="pl-0 pt-16 md:pl-64">
          <div className="min-h-[calc(100vh-4rem)]">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
