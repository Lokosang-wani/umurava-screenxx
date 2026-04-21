"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: "D" },
  { href: "/", label: "Analyze CV", icon: "A" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 top-16 hidden w-64 overflow-y-auto border-r border-gray-200 bg-white md:block">
      <nav className="p-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#2B74F0] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-semibold"
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
