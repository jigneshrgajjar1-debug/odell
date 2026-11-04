"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Sparkles, X, ShoppingBag } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface Hotspot {
  id: string;
  name: string;
  category: string;
  price: string;
  desc: string;
  top: string; // percentage
  left: string; // percentage
}

const hotspotsA: Hotspot[] = [
  {
    id: "libra-toilet",
    name: "LIBRA Wall-Hung Toilet",
    category: "Sanitaryware",
    price: "$850",
    desc: "Luxury 490x350mm rimless ceramic wall-hung toilet with soft-close slim seat. Matte finish.",
    top: "62%",
    left: "26%",
  },
  {
    id: "carrara-tiles",
    name: "Carrara Bookmatched Slabs",
    category: "Tiles",
    price: "$145 / sqm",
    desc: "Ultra-premium Italian Carrara bookmatched marble porcelain tiles, 1200x2400mm slabs.",
    top: "35%",
    left: "58%",
  },
  {
    id: "luxury-tub",
    name: "8064 L Luxury Freestanding & Jacuzzi Bathtub",
    category: "Bathtubs",
    price: "$2,800",
    desc: "1700x800x600mm monolithic sanitary acrylic bathtub with integrated whirlpool massage jets.",
    top: "70%",
    left: "78%",
  },
];

const hotspotsB: Hotspot[] = [
  {
    id: "kanzo-basin",
    name: "KANZO Tabletop Basin",
    category: "Sanitaryware",
    price: "$340",
    desc: "Bespoke 360x705x135mm thin-walled designer washbasin in double-fired vitreous china glaze.",
    top: "56%",
    left: "56%",
  },
  {
    id: "serena-shower",
    name: "SERENA Hot & Cold Shower Set",
    category: "Bathware",
    price: "$1,120",
    desc: "Brushed gold 3-function hot & cold thermostatic rain shower set with handheld spray.",
    top: "38%",
    left: "24%",
  },
];

export default function RoomPan() {
  const [angle, setAngle] = useState<"A" | "B">("A");
  const [isRotating, setIsRotating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const activeHotspots = angle === "A" ? hotspotsA : hotspotsB;
  const currentImage = angle === "A" ? getAssetPath("/images/bathroom_a.png") : getAssetPath("/images/bathroom_b.png");

  const handleRotate = () => {
    setIsRotating(true);
    setActiveHotspot(null);
    setTimeout(() => {
      setAngle((prev) => (prev === "A" ? "B" : "A"));
      setIsRotating(false);
    }, 650); // Maps to transition speed
  };

  return (
    <div className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden border border-gold/15 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-obsidian">
      {/* 180° Visual Renders Container */}
      <div className="absolute inset-0 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={angle}
            initial={{ opacity: 0.3, scale: 1.05, filter: "blur(12px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: isRotating ? "blur(12px)" : "blur(0px)" 
            }}
            exit={{ opacity: 0.3, scale: 0.95, filter: "blur(12px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            {/* Absolute Render Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage}
              alt={`Luxury Showroom View ${angle}`}
              className="w-full h-full object-cover"
            />
            {/* Dark vignette to enhance luxury look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/35 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating 180° Rotation Action */}
      <button
        onClick={handleRotate}
        disabled={isRotating}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3 bg-obsidian/85 hover:bg-gold hover:text-obsidian text-gold font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full border border-gold/20 hover:border-transparent transition-all duration-300 shadow-lg backdrop-blur-md active:scale-95"
      >
        <RotateCw className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`} />
        Rotate View 180°
      </button>

      {/* Hotspots Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {!isRotating &&
          activeHotspots.map((hs) => (
            <div
              key={hs.id}
              className="absolute pointer-events-auto"
              style={{ top: hs.top, left: hs.left }}
            >
              {/* Hotspot Pulse ring */}
              <button
                onClick={() => setActiveHotspot(hs)}
                className="relative flex items-center justify-center w-8 h-8 group focus:outline-none"
              >
                <span className="absolute w-full h-full rounded-full bg-gold/30 animate-ping opacity-75" />
                <span className="absolute w-5 h-5 rounded-full bg-obsidian border border-gold group-hover:bg-gold transition-colors duration-300 shadow-md flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-gold group-hover:text-obsidian transition-colors duration-300" />
                </span>
              </button>
            </div>
          ))}
      </div>

      {/* Active Hotspot Modal Overlay */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-[#121214] border border-gold/20 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 text-alabaster/60 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-gold px-2 py-0.5 bg-gold/10 border border-gold/15 rounded">
                  {activeHotspot.category}
                </span>
                <h4 className="text-xl font-serif font-bold text-white mt-3 mb-2">
                  {activeHotspot.name}
                </h4>
                <p className="text-alabaster/60 text-xs leading-relaxed mb-4">
                  {activeHotspot.desc}
                </p>
                <div className="text-lg font-semibold text-gold mb-6">
                  {activeHotspot.price}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="flex-1 bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Spec Sheet
                </button>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="px-4 border border-alabaster/10 hover:border-gold/30 text-alabaster/60 hover:text-white font-medium text-xs py-3 rounded-lg transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Angle Helper watermark */}
      <div className="absolute top-4 left-6 pointer-events-none z-10 flex items-center gap-2 bg-black/60 px-3 py-1 rounded border border-gold/15 text-[10px] tracking-widest font-semibold uppercase text-gold">
        <Sparkles className="w-3 h-3" />
        Perspective: {angle === "A" ? "Angle A - Tub & Libra Toilet" : "Angle B - Vanity & Serena Shower"}
      </div>
    </div>
  );
}
