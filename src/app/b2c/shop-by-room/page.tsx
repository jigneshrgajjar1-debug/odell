"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";
import RoomPan from "@/components/room-pan";

export default function ShopByRoomPage() {
  return (
    <main className="min-h-screen bg-obsidian text-alabaster pb-20">
      {/* Premium Navbar */}
      <header className="w-full bg-obsidian/70 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <LuxuryLogo width={160} height={48} color="gold" />
          <Link href="/b2c/booking" className="bg-gold text-obsidian font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg text-center hover:bg-gold-hover transition-colors duration-300">
            Book VIP Concierge
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col items-center">
        <div className="mb-12 text-center max-w-2xl border-b border-gold/15 pb-8 w-full">
          <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 180-Degree Pan Tour
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-4">
            Shop By Room
          </h1>
          <p className="text-alabaster/60 text-sm leading-relaxed">
            Take a virtual tour in our flagship luxury bathroom model. Click the pulsing hotspots to inspect our premium products and add them directly into your bespoke specification book.
          </p>
        </div>

        {/* The 180° Room Pan Component */}
        <div className="w-full flex justify-center mt-4">
          <RoomPan />
        </div>

        {/* Quick Instructions / Features */}
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
          <div className="p-6 rounded-2xl bg-[#121214] border border-gold/10">
            <strong className="text-sm text-gold block mb-2 font-serif">180° Rotation</strong>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              Use the bottom control to sweep the camera perspective 180 degrees to view the opposite side of the showroom room geometry.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#121214] border border-gold/10">
            <strong className="text-sm text-gold block mb-2 font-serif">Pulsing Hotspots</strong>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              Hover or click the glowing indicators to reveal technical models, sizes, custom descriptions, and direct budget pricing.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#121214] border border-gold/10">
            <strong className="text-sm text-gold block mb-2 font-serif">Spec Book</strong>
            <p className="text-xs text-alabaster/60 leading-relaxed">
              Add items into your architectural specification portfolio to download and share with your interior design contractors.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
