import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScreenerX | HR AI Screening",
  description: "AI-Powered Talent Screening Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col">
              <Header />
              <main className="flex-1 pt-16 bg-gray-50 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
