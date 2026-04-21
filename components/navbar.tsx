"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#2B74F0] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Umarava</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700"
          >
            U
          </span>
          <span className="text-sm">{user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          <span aria-hidden="true" className="text-sm font-semibold">
            →
          </span>
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
