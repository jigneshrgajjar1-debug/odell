"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";
import ShowroomScheduler from "@/components/showroom-scheduler";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-obsidian text-alabaster pb-20">
      {/* Premium Navbar */}
      <header className="w-full bg-obsidian/70 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <LuxuryLogo width={160} height={48} color="gold" />
          <Link href="/b2c/gallery" className="border border-gold/25 hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg text-center transition-all duration-300">
            View Gallery
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col items-center">
        <div className="mb-12 text-center max-w-2xl border-b border-gold/15 pb-8 w-full">
          <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Elite Concierge
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-4">
            Showroom Consultation
          </h1>
          <p className="text-alabaster/60 text-sm leading-relaxed">
            Reserve a dedicated design concierge for a private guided viewing at our premium flagship ateliers in Westlands (Nairobi), Nyali (Mombasa), or Kololo (Kampala).
          </p>
        </div>

        {/* The VIP Showroom Scheduler Component */}
        <div className="w-full flex justify-center mt-4">
          <ShowroomScheduler />
        </div>
      </div>
    </main>
  );
}
