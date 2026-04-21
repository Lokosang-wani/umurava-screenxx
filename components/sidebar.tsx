"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/lib/auth-context";

import { 
  BarChart3, 
  Search, 
  FileText, 
  Bookmark, 
  Mail, 
  User, 
  Settings, 
  HelpCircle,
  LayoutDashboard
} from "lucide-react";

const adminSidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analyze", label: "Analyze CV", icon: Search },
];

const candidateSidebarItems = [
  { href: "/", label: "Find Jobs", icon: Search },
  { href: "/dashboard", label: "My Applications", icon: FileText },
  { href: "/dashboard/saved", label: "Saved Jobs", icon: Bookmark },
  { href: "/dashboard/messages", label: "Messages", icon: Mail },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const role = (user?.user_metadata as { role?: string })?.role ?? "candidate";
  const items = role === "admin" ? adminSidebarItems : candidateSidebarItems;

  return (
    <div className="fixed bottom-0 left-0 top-16 hidden w-[260px] overflow-y-auto border-r border-slate-200 bg-white md:block z-40">
      <nav className="p-6 flex flex-col h-full">
        <div className="space-y-1 mb-8">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-[#2B74F0] font-bold border-l-4 border-[#2B74F0]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "opacity-100" : "opacity-70"}`} />
                <span className="text-sm font-medium tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-slate-100 space-y-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-900 transition-colors group"
          >
            <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">Settings</span>
          </Link>
          <Link
            href="/dashboard/help"
            className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-900 transition-colors group"
          >
            <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-wider">Help</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
