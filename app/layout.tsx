import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventPlanner - Modern Event Management Platform",
  description: "Plan, organize, and discover unforgettable events with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f9fc] text-slate-900 min-h-screen`}
      >
        <div className="min-h-screen flex relative overflow-x-hidden">
          {/* Left Navigation Sidebar */}
          <Sidebar session={session} />

          {/* Right Main Content Column */}
          <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
            {/* Ambient Background Glow (matches screenshot right margin) */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-400/10 via-violet-300/5 to-transparent blur-3xl pointer-events-none -z-10" />
            
            {/* Top Navigation Bar */}
            <Header session={session} />

            {/* Page Content Container */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
