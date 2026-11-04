"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, DollarSign, FileText, Send, Info } from "lucide-react";

interface WallOption {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  accent: string;
}

interface FixtureOption {
  id: string;
  name: string;
  price: number;
  colorHex: string;
  desc: string;
}

const wallOptions: WallOption[] = [
  { id: "carrara", name: "Carrara Slabs", price: 145, image: "/images/tiles_cat.png", desc: "Premium Italian Carrara bookmatched marble porcelain with refined grey-gold veins.", accent: "from-alabaster/10 to-gold/10" },
  { id: "onyx", name: "Bespoke Onyx", price: 185, image: "/images/bathroom_a.png", desc: "Warm, semi-translucent gilded onyx slab textures bringing deep biological glows.", accent: "from-[#3a2f20]/40 to-[#e4a853]/15" },
  { id: "obsidian", name: "Obsidian Basalt", price: 120, image: "/images/bathware_cat.png", desc: "Deep dark textured volcanic stone surface bringing high-contrast architectural stiction.", accent: "from-black/60 to-charcoal/20" },
];

const fixtureOptions: FixtureOption[] = [
  { id: "gold", name: "Brushed Gold", price: 1120, colorHex: "#C5A880", desc: "Gilded PVD titanium coating offering timeless luxury reflections." },
  { id: "black", name: "Matte Obsidian", price: 920, colorHex: "#1E1E20", desc: "Industrial powder-coated deep black, resisting water spots and fingerprints." },
  { id: "chrome", name: "Reflective Chrome", price: 780, colorHex: "#E5E7EB", desc: "Double-plated high-gloss mirror chrome finish with crisp lines." },
];

export default function MaterialConfigurator() {
  const [selectedWall, setSelectedWall] = useState<string>("carrara");
  const [selectedFixture, setSelectedFixture] = useState<string>("gold");
  const [inquirySent, setInquirySent] = useState(false);

  const activeWall = wallOptions.find((w) => w.id === selectedWall) || wallOptions[0];
  const activeFixture = fixtureOptions.find((f) => f.id === selectedFixture) || fixtureOptions[0];

  // Dynamically computed metrics
  const tileCoverageSqm = 35; // average luxury bathroom coverage
  const tilesTotalCost = activeWall.price * tileCoverageSqm;
  const sanitarywareCost = 1190; // Libra toilet + Kanto basin base price
  const totalCost = tilesTotalCost + sanitarywareCost + activeFixture.price;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-3xl overflow-hidden border border-gold/15 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* 1. VISUAL PREVIEW PANEL (7 Cols) */}
        <div className="lg:col-span-7 relative h-[350px] lg:h-auto min-h-[400px] bg-black overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedWall}
              initial={{ opacity: 0.4, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0.4, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeWall.image}
                alt={activeWall.name}
                className="w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
              />
              
              {/* Dynamic shader overlay blending selected colors */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr ${activeWall.accent} mix-blend-overlay transition-all duration-700 pointer-events-none`} 
              />
              
              {/* Gold/Black fixture tint shimmer */}
              <div 
                className="absolute inset-0 bg-black/20 mix-blend-color pointer-events-none transition-colors duration-700"
                style={{ 
                  backgroundColor: activeFixture.id === "gold" 
                    ? "rgba(197, 168, 128, 0.1)" 
                    : activeFixture.id === "black" 
                    ? "rgba(0, 0, 0, 0.35)" 
                    : "rgba(255, 255, 255, 0.05)" 
                }} 
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Perspective Watermark */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-lg border border-gold/15 text-[10px] tracking-widest font-semibold uppercase text-gold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Configurator Live Preview
          </div>

          {/* Quick Details Floating Tag */}
          <div className="absolute bottom-6 left-6 right-6 z-10 bg-obsidian/80 border border-gold/10 p-4 rounded-xl backdrop-blur-md">
            <span className="text-[9px] uppercase tracking-widest font-bold text-gold">Interactive Sanctuary Specs</span>
            <h4 className="text-sm font-serif font-bold text-white mt-1">
              {activeWall.name} Wall • {activeFixture.name} Fittings
            </h4>
            <p className="text-alabaster/50 text-[10px] leading-relaxed mt-1 hidden sm:block">
              {activeWall.desc}
            </p>
          </div>
        </div>

        {/* 2. CONTROLLER & ESTIMATOR PANEL (5 Cols) */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-[#121214] border-t lg:border-t-0 lg:border-l border-gold/15">
          <div className="space-y-6">
            <div className="border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif font-bold text-alabaster">Configure Sanctuary</h3>
              <p className="text-alabaster/55 text-xs mt-1">
                Customize imported materials to formulate your bespoke budget estimate.
              </p>
            </div>

            {/* Option A: Wall Tiles selection */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2.5 block">
                1. Select Premium Wall Tiles
              </label>
              <div className="grid grid-cols-3 gap-2">
                {wallOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWall(w.id)}
                    className={`py-3 px-2 rounded-lg border text-center transition-all duration-300 ${
                      selectedWall === w.id
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-alabaster/10 bg-black/30 text-alabaster/60 hover:border-gold/20"
                    }`}
                  >
                    <strong className="text-xs block leading-tight">{w.name}</strong>
                    <span className="text-[9px] opacity-75 mt-1 block font-mono">${w.price}/m²</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option B: Fixture Color selection */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2.5 block">
                2. Select Fixture Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fixtureOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFixture(f.id)}
                    className={`py-2 px-2 rounded-lg border flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      selectedFixture === f.id
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-alabaster/10 bg-black/30 text-alabaster/60 hover:border-gold/20"
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/30 flex-shrink-0"
                      style={{ backgroundColor: f.colorHex }}
                    />
                    <strong className="text-[10px] tracking-wider uppercase">{f.name.split(" ")[1] || f.name}</strong>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Spec Breakdown */}
            <div className="bg-black/40 border border-gold/10 rounded-2xl p-4 space-y-3 font-mono text-[10px] leading-relaxed">
              <div className="flex justify-between border-b border-alabaster/5 pb-2">
                <span className="text-alabaster/55 uppercase tracking-wider">Wall Slabs ({tileCoverageSqm}m²)</span>
                <span className="text-alabaster">${tilesTotalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-alabaster/5 pb-2">
                <span className="text-alabaster/55 uppercase tracking-wider">Libra + Kanto Ceramics</span>
                <span className="text-alabaster">${sanitarywareCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-alabaster/5 pb-2">
                <span className="text-alabaster/55 uppercase tracking-wider">Serena Shower ({activeFixture.name})</span>
                <span className="text-alabaster">${activeFixture.price.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between pt-2 text-xs font-bold text-gold">
                <span className="uppercase tracking-widest font-serif font-semibold">Total Sanctuary Est:</span>
                <span className="flex items-center text-sm font-semibold">
                  <DollarSign className="w-4 h-4" />
                  {totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-4 border-t border-gold/10 space-y-3">
            <button
              onClick={handleInquiry}
              className="w-full bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              {inquirySent ? (
                <>
                  <Check className="w-4 h-4" />
                  Specs Inquiry Dispatched
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Specs to Concierge
                </>
              )}
            </button>
            
            <div className="flex items-start gap-2 bg-gold/5 border border-gold/10 p-3 rounded-lg text-[9px] text-alabaster/60 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
              <span>
                Dispatches your customized configuration code (Ref: <strong className="text-gold">OD-{activeWall.id.toUpperCase()}-{activeFixture.id.toUpperCase()}</strong>) directly to our local concierge team in Nairobi, Mombasa, or Kampala.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
