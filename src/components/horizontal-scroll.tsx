"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowRight, Grid, Eye, Sparkles } from "lucide-react";
import Link from "next/link";

interface HorizontalScrollProps {
  track: "b2c" | "b2b";
  onResetTrack: () => void;
}

export default function HorizontalScroll({ track, onResetTrack }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  // Transforms for ambient glow background matching the active panel
  const glowColor = useTransform(
    scrollXProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle at 30% 30%, rgba(197,168,128,0.1) 0%, transparent 60%)",
      "radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%)",
      "radial-gradient(circle at 70% 30%, rgba(197,168,128,0.1) 0%, transparent 60%)",
    ]
  );

  return (
    <div className="relative w-full h-[85vh] bg-[#080809] overflow-hidden flex flex-col justify-between">
      {/* Dynamic ambient color glow */}
      <motion.div
        style={{ backgroundImage: glowColor }}
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,128,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.015)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" />

      {/* Header bar inside scroll area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/10 uppercase">
            Atelier: {track === "b2c" ? "Homeowner Journey" : "Trade Professional Portal"}
          </span>
        </div>
        <button
          onClick={onResetTrack}
          className="text-xs uppercase tracking-widest text-alabaster/50 hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold/30 pb-0.5"
        >
          Change Track
        </button>
      </div>

      {/* 3-Panel Scroll Wrapper */}
      <div
        ref={containerRef}
        className="relative z-10 flex w-full h-[65vh] overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {/* PANEL 1: TILES */}
        <div className="flex-shrink-0 w-full h-full snap-start flex items-center justify-center px-6">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group border border-gold/10"
            >
              {/* Background gradient block representing luxury tiles */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#161619] via-[#0E0E10] to-[#25231F] flex items-center justify-center">
                <Grid className="w-24 h-24 text-gold/15 group-hover:scale-110 transition-transform duration-700 ease-out" />
                {/* Tile-like geometric grid */}
                <div className="absolute inset-4 border border-gold/5 rounded-2xl grid grid-cols-3 gap-2 p-2">
                  <div className="bg-gold/5 rounded opacity-40 border border-gold/10" />
                  <div className="bg-gold/5 rounded opacity-20 border border-gold/10" />
                  <div className="bg-gold/5 rounded opacity-60 border border-gold/10" />
                  <div className="bg-gold/5 rounded opacity-50 border border-gold/10" />
                  <div className="bg-gold/5 rounded opacity-80 border border-gold/10" />
                  <div className="bg-gold/5 rounded opacity-30 border border-gold/10" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase bg-black/60 px-3 py-1 rounded border border-gold/20">
                  PILLAR 01
                </span>
                <h4 className="text-xl font-serif text-white font-bold mt-2">Bespoke Tile Atelier</h4>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-alabaster mb-4 tracking-wide leading-tight">
                Imported Slabs & <br />
                <span className="text-gold">Textured Porcelains</span>
              </h3>
              <p className="text-alabaster/60 text-base mb-8 max-w-xl leading-relaxed">
                Curated collections of bookmatched Carrara marble, large-format sintered stone slabs, glazed kitchen backsplashes, and anti-slip exterior tiling. Exquisite textures imported from premium Spanish and Italian kiln artisans.
              </p>

              <div>
                {track === "b2c" ? (
                  <Link
                    href="/b2c/gallery"
                    className="inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:translate-y-[-2px]"
                  >
                    View Inspiration Gallery
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/b2b/specs"
                    className="inline-flex items-center gap-3 border border-gold hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    Get Technical Specs
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: SANITARYWARE */}
        <div className="flex-shrink-0 w-full h-full snap-start flex items-center justify-center px-6">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group border border-gold/10"
            >
              {/* Geometric drawing representing sanitaryware */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F0E10] via-[#161619] to-[#1F2225] flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-gold/10 group-hover:scale-110 transition-transform duration-700 ease-out" />
                {/* Outlines of washbasins/toilets in abstract */}
                <div className="absolute inset-12 border border-gold/10 rounded-full opacity-40 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-gold/15 rounded-full flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border border-gold/20 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase bg-black/60 px-3 py-1 rounded border border-gold/20">
                  PILLAR 02
                </span>
                <h4 className="text-xl font-serif text-white font-bold mt-2">Luxury Sanitaryware</h4>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-alabaster mb-4 tracking-wide leading-tight">
                Architectural Ceramics & <br />
                <span className="text-gold">Sleek Tabletop Basins</span>
              </h3>
              <p className="text-alabaster/60 text-base mb-8 max-w-xl leading-relaxed">
                Featuring the premier <strong>Kanto</strong> tabletop washbasins, <strong>Libra</strong> and <strong>Cube</strong> wall-hung toilets, and high-performance concealed pneumatic cisterns. Exceptional glaze finishes engineered for unmatched durability and pristine aesthetics.
              </p>

              <div>
                {track === "b2c" ? (
                  <Link
                    href="/b2c/shop-by-room"
                    className="inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:translate-y-[-2px]"
                  >
                    Interactive Room Tour
                    <Eye className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/b2b/catalog"
                    className="inline-flex items-center gap-3 border border-gold hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    Check Bulk Catalog
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: BATHWARE */}
        <div className="flex-shrink-0 w-full h-full snap-start flex items-center justify-center px-6">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden group border border-gold/10"
            >
              {/* Geometric drawing representing shower sets */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#161619] via-[#0A0A0B] to-[#252528] flex items-center justify-center">
                <div className="w-1 h-36 bg-gradient-to-b from-gold/5 to-gold/30 rounded" />
                <div className="absolute top-16 w-20 h-1 bg-gold/25 rounded" />
                <div className="absolute top-24 w-12 h-1 bg-gold/30 rounded" />
                <div className="absolute top-36 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gold/35" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase bg-black/60 px-3 py-1 rounded border border-gold/20">
                  PILLAR 03
                </span>
                <h4 className="text-xl font-serif text-white font-bold mt-2">Bathware Systems</h4>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-alabaster mb-4 tracking-wide leading-tight">
                3-Function Hot & Cold <br />
                <span className="text-gold">Designer Showers</span>
              </h3>
              <p className="text-alabaster/60 text-base mb-8 max-w-xl leading-relaxed">
                Engineering excellence in luxury bathrooms. Showcasing the <strong>Tesoro</strong>, <strong>Serena</strong>, and <strong>Vanessa</strong> hot & cold multi-function shower systems. Sculpted profiles, precision thermostatic controls, and premium gold or matte black coatings.
              </p>

              <div>
                {track === "b2c" ? (
                  <Link
                    href="/b2c/booking"
                    className="inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:translate-y-[-2px]"
                  >
                    Book Private VIP Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href="/b2b/login"
                    className="inline-flex items-center gap-3 border border-gold hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    Enter B2B Trade Portal
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Indicators / Scroll Assist */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-widest text-alabaster/30 font-medium hidden sm:inline">
            Swipe or Scroll horizontally to explore
          </span>
        </div>

        {/* Custom Progress Dots synced with horizontal progress */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full border border-gold bg-gold opacity-100" />
          <div className="w-2.5 h-2.5 rounded-full border border-gold/40" />
          <div className="w-2.5 h-2.5 rounded-full border border-gold/40" />
        </div>
      </div>
    </div>
  );
}
