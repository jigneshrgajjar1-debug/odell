"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, BadgeCheck, FileBox, Layers, Compass, Hammer } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-obsidian text-alabaster pb-20">
      {/* Premium Navbar */}
      <header className="w-full bg-obsidian/70 backdrop-blur-md border-b border-gold/10 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <LuxuryLogo width={160} height={48} color="gold" />
          <Link href="/b2b/catalog" className="bg-gold text-obsidian font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg text-center hover:bg-gold-hover transition-colors duration-300">
            Bulk Catalog
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="mb-12 border-b border-gold/15 pb-8">
          <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4" /> Professional Architect Core
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
            Technical Specifications
          </h1>
          <p className="text-alabaster/60 text-sm mt-3 max-w-xl">
            Verified testing metrics, fire certifications, and architectural standards for engineering-focused building specifications.
          </p>
        </div>

        {/* Spec Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Slip ratings */}
          <div className="glass-panel rounded-3xl p-8 border border-gold/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/15 mb-6">
                <Compass className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Tile Slip Resistance Ratings</h3>
              <p className="text-alabaster/60 text-xs leading-relaxed mb-6">
                Our floor tiles are tested under DIN 51130 ramp standards. We distribute tiles ranging from R9 to R13 slip resistance, covering all residential and heavy corporate projects.
              </p>
              
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">R9</span>
                  <span className="text-alabaster/80">Dry indoor areas, living rooms, and entrance lounges.</span>
                </li>
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">R10</span>
                  <span className="text-alabaster/80">Bathrooms, domestic kitchens, and utility room zones.</span>
                </li>
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">R11</span>
                  <span className="text-alabaster/80">Outdoor terraces, high-moisture spas, and public wet rooms.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">R12/13</span>
                  <span className="text-alabaster/80">Commercial pool surrounds, heavy-traffic ramps, and driveways.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: PEI Abrasion Ratings */}
          <div className="glass-panel rounded-3xl p-8 border border-gold/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/15 mb-6">
                <Layers className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">PEI Abrasion Classes (Wear)</h3>
              <p className="text-alabaster/60 text-xs leading-relaxed mb-6">
                Determining tile suitability under different surface friction loads. Rated under ISO 10545-7 standards.
              </p>
              
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">PEI II</span>
                  <span className="text-alabaster/80">Light traffic: Residential bathrooms and private bedrooms.</span>
                </li>
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">PEI III</span>
                  <span className="text-alabaster/80">Medium traffic: Living rooms, kitchens, corridors, and balconies.</span>
                </li>
                <li className="flex items-center gap-3 border-b border-alabaster/5 pb-2">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">PEI IV</span>
                  <span className="text-alabaster/80">Heavy traffic: Hotels, commercial showrooms, and offices.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-mono text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">PEI V</span>
                  <span className="text-alabaster/80">Extreme traffic: Shopping malls, airports, and public concourses.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Sanitary Standards */}
          <div className="glass-panel rounded-3xl p-8 border border-gold/10">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/15 mb-6">
              <BadgeCheck className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Ceramic Glaze & Flush Standards</h3>
            <p className="text-alabaster/60 text-xs leading-relaxed mb-6">
              Odell ceramics feature our custom nano-glaze fired at 1280°C, establishing a highly polished pore-free surface that resists dirt and limescale buildup.
            </p>
            <div className="space-y-4 text-xs">
              <div className="bg-black/30 border border-gold/5 p-4 rounded-xl">
                <strong className="text-white block mb-1">Load Bearing Integrity</strong>
                <p className="text-alabaster/50 text-[11px]">
                  Wall-hung toilets are structural components tested to support static loads of up to 400kg under EN 997 standards.
                </p>
              </div>
              <div className="bg-black/30 border border-gold/5 p-4 rounded-xl">
                <strong className="text-white block mb-1">Pneumatic Cistern Efficiency</strong>
                <p className="text-alabaster/50 text-[11px]">
                  Dual-flush WY-G0031 cisterns carry European WRAS approvals, operating under 3L / 6L variable eco-flush settings.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: BIM/CAD downloads */}
          <div className="glass-panel rounded-3xl p-8 border border-gold/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/15 mb-6">
                <FileBox className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">BIM & CAD Models</h3>
              <p className="text-alabaster/60 text-xs leading-relaxed mb-6">
                Integrate Odell ceramic products directly into your Revit or AutoCAD workflows. High-definition 3D models with true material physics maps.
              </p>
              <div className="space-y-3">
                <button className="w-full border border-gold/25 hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <Hammer className="w-4 h-4" /> Download .RVT (Revit Models)
                </button>
                <button className="w-full border border-alabaster/10 hover:border-gold/30 text-alabaster/60 hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Download .DWG (AutoCAD Drawings)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
