'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Isolate landing page and application routes
  const isPublicRoute = pathname === '/' || pathname?.startsWith('/apply') || pathname?.startsWith('/auth');

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 pt-20 bg-[#F8FAFC] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>ScreenerX | AI-Powered Talent Screening</title>
        <meta name="description" content="AI-Powered Talent Screening Tool" />
      </head>
      <body className={`${inter.className} bg-[#F8FAFC]`}>
        <StoreProvider>
          <LayoutShell>{children}</LayoutShell>
        </StoreProvider>
      </body>
    </html>
  );
}
