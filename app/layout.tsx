import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umarava AI Hackathon",
  description: "AI-powered candidate analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-work-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
