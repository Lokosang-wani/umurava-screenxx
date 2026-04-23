'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProfile } from "@/store/slices/authSlice";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);

  // Isolate landing page and application routes
  const isPublicRoute = pathname === '/' || pathname?.startsWith('/apply');
  const isAuthRoute = pathname?.startsWith('/auth');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem('token');
    
    if (!isPublicRoute && !isAuthRoute) {
      // Protected route logic
      if (!token) {
        router.push('/auth/signin');
      } else if (!user && !isLoading) {
        dispatch(fetchProfile());
      }
    } else if (isAuthRoute && token && isAuthenticated) {
      // Already logged in, redirect away from auth pages
      router.push('/dashboard');
    }
  }, [mounted, isPublicRoute, isAuthRoute, user, isAuthenticated, isLoading, dispatch, router]);

  // Prevent hydration mismatch by returning a consistent skeleton/loader on first render
  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-white" />
    );
  }

  // While checking authentication on protected routes, show a loader
  if (!isPublicRoute && !isAuthRoute) {
    const token = localStorage.getItem('token');
    if (!token || (!user && isLoading)) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 font-medium animate-pulse">Securing session...</p>
          </div>
        </div>
      );
    }
  }

  if (isPublicRoute || isAuthRoute) {
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
        <link rel="icon" href="/screenerx-logo-fav-icon.png" type="image/png" />
      </head>
      <body className={`${inter.className} bg-[#F8FAFC]`}>
        <StoreProvider>
          <LayoutShell>{children}</LayoutShell>
        </StoreProvider>
      </body>
    </html>
  );
}
