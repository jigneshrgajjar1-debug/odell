"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Download, Sparkles, Check, MoveHorizontal } from "lucide-react";
import Link from "next/link";

export interface GalleryProduct {
  id: string;
  name: string;
  cat: string;
  code: string;
  dims: string;
  desc: string;
  img: string;
  tier: 1 | 2 | 3;
  width: number; // card width in px
  height: number;
}

export const galleryProducts: GalleryProduct[] = [
  // --- TIER 1 (Top Tier - Speed factor: 1.1x) ---
  {
    id: "prado",
    name: "PRADO - 8609 One-Piece Toilet",
    cat: "Sanitaryware",
    code: "OD-PR-8609",
    dims: "680x400x730mm",
    desc: "Rimless vitreous china one-piece with P-Trap (180mm) & S-Trap (250mm). Double-glazed at 1280°C.",
    img: "/images/products/prod_prado.png",
    tier: 1,
    width: 250,
    height: 200,
  },
  {
    id: "kanzo",
    name: "KANZO Tabletop Basin",
    cat: "Wash Basins",
    code: "OD-BS-KNZO",
    dims: "360x705x135mm",
    desc: "Ultra-thin profile oval designer washbasin with anti-stain ceramic coating.",
    img: "/images/products/prod_kanzo.png",
    tier: 1,
    width: 270,
    height: 195,
  },
  {
    id: "serena",
    name: "SERENA - S0733A Shower System",
    cat: "Luxury Faucets",
    code: "OD-SH-SERE",
    dims: "Height Adjustable",
    desc: "Hot & cold 3-function rain shower in polished mirror chrome with handheld spray.",
    img: "/images/products/prod_serena.png",
    tier: 1,
    width: 240,
    height: 220,
  },
  {
    id: "tub8064",
    name: "8064 L Jacuzzi Whirlpool Bathtub",
    cat: "Bathtubs",
    code: "OD-BT-8064",
    dims: "1700x800x600mm",
    desc: "Dual hydromassage system with ergonomic acrylic shell and mood illumination.",
    img: "/images/products/prod_tub_8064.png",
    tier: 1,
    width: 300,
    height: 210,
  },
  {
    id: "drain703",
    name: "MI - 703 Capsule Shower Drain",
    cat: "Drains & SS Hardware",
    code: "OD-DR-703",
    dims: "100x600mm",
    desc: "AISI 304 marine grade stainless steel linear capsule drain in Satin & PVD Black.",
    img: "/images/products/prod_drain_703.png",
    tier: 1,
    width: 290,
    height: 190,
  },
  {
    id: "mirror10031",
    name: "L10031 Oval Backlit LED Mirror",
    cat: "LED Mirrors",
    code: "OD-MR-10031",
    dims: "600x800mm",
    desc: "Copper-free HD mirror with ambient halo illumination and touch sensor defogger.",
    img: "/images/products/prod_mirror_10031.png",
    tier: 1,
    width: 230,
    height: 215,
  },
  {
    id: "armani",
    name: "ARMANI LJ205S Wall-Hung Toilet",
    cat: "Sanitaryware",
    code: "OD-LH-ARM20",
    dims: "510x345x365mm",
    desc: "Minimalist European wall-hung ceramic with silent soft-close slim UF seat.",
    img: "/images/products/prod_armani.png",
    tier: 1,
    width: 250,
    height: 200,
  },
  {
    id: "evon",
    name: "EVON Tabletop Basin",
    cat: "Wash Basins",
    code: "OD-BS-EVON",
    dims: "420x420x130mm",
    desc: "Circular geometric washbasin with concealed waste geometry and thin rim.",
    img: "/images/products/prod_evon.png",
    tier: 1,
    width: 240,
    height: 195,
  },
  {
    id: "vanessa",
    name: "VANESSA - S0806 Rain Shower",
    cat: "Luxury Faucets",
    code: "OD-SH-VANE",
    dims: "3-Function Hot & Cold",
    desc: "Thermostatic mixer with integrated tempered glass shampoo shelf console.",
    img: "/images/products/prod_vanessa.png",
    tier: 1,
    width: 250,
    height: 220,
  },
  {
    id: "handle01",
    name: "AMH 01 Mortise Handle",
    cat: "Architectural Locks",
    code: "OD-LK-AMH01",
    dims: "19x22mm Round Pipe",
    desc: "Heavy-duty AISI 304 architectural door handle with euro profile cylinder lock.",
    img: "/images/products/prod_handle_01.png",
    tier: 1,
    width: 230,
    height: 195,
  },
  {
    id: "rolex",
    name: "ROLEX LJ208 Wall-Hung Toilet",
    cat: "Sanitaryware",
    code: "OD-LH-RLX20",
    dims: "510x360x350mm",
    desc: "Vitreous china wall outlet toilet with precision flush trajectory.",
    img: "/images/products/prod_rolex.png",
    tier: 1,
    width: 250,
    height: 200,
  },
  {
    id: "bently",
    name: "BENTLY Luxury Corner Basin",
    cat: "Wash Basins",
    code: "OD-BS-BNTL",
    dims: "365x377x151mm",
    desc: "Space-saving curved corner washbasin engineered for powder room sanctuaries.",
    img: "/images/products/prod_bently.png",
    tier: 1,
    width: 240,
    height: 195,
  },
  {
    id: "blackrack",
    name: "Aster Matt Black SS 304 Suite",
    cat: "Drains & SS Hardware",
    code: "OD-AC-ASTER",
    dims: "600mm Double Rack",
    desc: "PVD Matt Black towel shelf, robe hook, and glass tumbler holder.",
    img: "/images/products/prod_black_rack.png",
    tier: 1,
    width: 270,
    height: 200,
  },

  // --- TIER 2 (Middle Tier - Drifts directly behind centered text - Speed factor: 0.85x) ---
  {
    id: "hilton",
    name: "HILTON - 8612 One-Piece Toilet",
    cat: "Sanitaryware",
    code: "OD-HI-8612",
    dims: "710x390x770mm",
    desc: "High-comfort ergonomic pan with heavy vitreous china double-fired glaze.",
    img: "/images/products/prod_hilton.png",
    tier: 2,
    width: 260,
    height: 220,
  },
  {
    id: "qubix",
    name: "QUBIX Tabletop Basin",
    cat: "Wash Basins",
    code: "OD-BS-QBX",
    dims: "350x625x115mm",
    desc: "Rectangular slim basin with precision radiused corners and silk glaze.",
    img: "/images/products/prod_qubix.png",
    tier: 2,
    width: 270,
    height: 205,
  },
  {
    id: "tesoro",
    name: "TESORO - S0844A Thermostatic Shower",
    cat: "Luxury Faucets",
    code: "OD-SH-TESO",
    dims: "3-Function Anti-Scald",
    desc: "Brushed Gunmetal thermostatic rain shower set with handheld spray & spout.",
    img: "/images/products/prod_tesoro.png",
    tier: 2,
    width: 250,
    height: 230,
  },
  {
    id: "tub8027",
    name: "8027 L Circular Jacuzzi Spa",
    cat: "Bathtubs",
    code: "OD-BT-8027",
    dims: "1500x1500x600mm",
    desc: "Round resort centerpiece hydromassage bathtub with multi-jet water massage.",
    img: "/images/products/prod_tub_8027.png",
    tier: 2,
    width: 280,
    height: 225,
  },
  {
    id: "drain733",
    name: "MI - 733 Marble Inlay Linear Drain",
    cat: "Drains & SS Hardware",
    code: "OD-DR-733",
    dims: "100x600mm",
    desc: "Allows flush insertion of cut marble or tile slab for invisible drainage.",
    img: "/images/products/prod_drain_733.png",
    tier: 2,
    width: 290,
    height: 205,
  },
  {
    id: "mirror10001",
    name: "L10001 Triple LED Mirror",
    cat: "LED Mirrors",
    code: "OD-MR-10001",
    dims: "500x700mm",
    desc: "Black aluminum alloy frame with touch button defogger and front-facing LED.",
    img: "/images/products/prod_mirror_10001.png",
    tier: 2,
    width: 240,
    height: 225,
  },
  {
    id: "libra",
    name: "LIBRA Wall-Hung Rimless Toilet",
    cat: "Sanitaryware",
    code: "OD-LH-LBRA",
    dims: "505x355x385mm",
    desc: "Ultra-compact wall hung pan with rimless vortex flushing hygiene.",
    img: "/images/products/prod_libra.png",
    tier: 2,
    width: 260,
    height: 215,
  },
  {
    id: "stylen",
    name: "STYLEN Tabletop Basin",
    cat: "Wash Basins",
    code: "OD-BS-STLN",
    dims: "330x455x130mm",
    desc: "Compact rectangular countertop basin for powder rooms and master vanities.",
    img: "/images/products/prod_stylen.png",
    tier: 2,
    width: 250,
    height: 205,
  },
  {
    id: "grazia",
    name: "GRAZIA - S0597 Minimalist Rain Shower",
    cat: "Luxury Faucets",
    code: "OD-SH-GRAZ",
    dims: "3 Functions Hot & Cold",
    desc: "Geometric square rain head with ultra-thin stainless steel arm.",
    img: "/images/products/prod_grazia.png",
    tier: 2,
    width: 245,
    height: 230,
  },
  {
    id: "tub5053",
    name: "5053 L Hydromassage Bathtub",
    cat: "Bathtubs",
    code: "OD-BT-5053",
    dims: "1700x780x580mm",
    desc: "High-grade sanitary acrylic with lumbar support hydro jets and overflow waste.",
    img: "/images/products/prod_tub_5053.png",
    tier: 2,
    width: 290,
    height: 220,
  },
  {
    id: "handle03p",
    name: "AMH 03 P 8-Inch Heavy Plate Handle",
    cat: "Architectural Locks",
    code: "OD-LK-AMH03P",
    dims: "8-Inch Plate / 19mm Pipe",
    desc: "Stainless steel 304 solid door pull with spring-loaded brass latch mechanism.",
    img: "/images/products/prod_handle_03p.png",
    tier: 2,
    width: 240,
    height: 210,
  },
  {
    id: "towelrack",
    name: "Sapphire CP SS 304 Towel Rack",
    cat: "Drains & SS Hardware",
    code: "OD-AC-30306",
    dims: "600mm Double Tier",
    desc: "Mirror-finish polished chrome double towel rack with lower hanging bar.",
    img: "/images/products/prod_towel_rack.png",
    tier: 2,
    width: 270,
    height: 210,
  },

  // --- TIER 3 (Bottom Tier - Speed factor: 1.25x) ---
  {
    id: "tesla",
    name: "TESLA - 8615 One-Piece Toilet",
    cat: "Sanitaryware",
    code: "OD-TE-8615",
    dims: "700x375x760mm",
    desc: "Contemporary sculptural one-piece toilet with silent pneumatic flush.",
    img: "/images/products/prod_tesla.png",
    tier: 3,
    width: 250,
    height: 200,
  },
  {
    id: "opelbasin",
    name: "OPEL Integrated Basin",
    cat: "Wash Basins",
    code: "OD-BS-OPEL",
    dims: "430x510x363mm",
    desc: "One-piece molded vitreous china basin with integrated splash rim.",
    img: "/images/products/prod_opel_basin.png",
    tier: 3,
    width: 260,
    height: 200,
  },
  {
    id: "moda",
    name: "MODA - S022A 3-Function Shower Set",
    cat: "Luxury Faucets",
    code: "OD-SH-MODA",
    dims: "3 Functions Hot & Cold",
    desc: "Solid brass valve body with high-flow dual overhead rain and hand shower.",
    img: "/images/products/prod_moda.png",
    tier: 3,
    width: 240,
    height: 220,
  },
  {
    id: "tub8064f",
    name: "8064 L Freestanding Monolithic Bathtub",
    cat: "Bathtubs",
    code: "OD-BT-8064F",
    dims: "1700x800x600mm",
    desc: "Seamless double-walled freestanding soaking tub with built-in pop-up drain.",
    img: "/images/products/prod_tub_8064f.png",
    tier: 3,
    width: 300,
    height: 205,
  },
  {
    id: "drain651",
    name: "MI - 651 Heavy Tile Insert Drain",
    cat: "Drains & SS Hardware",
    code: "OD-DR-651",
    dims: "150x150mm",
    desc: "Solid 700g AISI 304 steel square tile insert with removable hair trap.",
    img: "/images/products/prod_drain_651.png",
    tier: 3,
    width: 250,
    height: 195,
  },
  {
    id: "cube",
    name: "CUBE Wall-Hung Rimless Toilet",
    cat: "Sanitaryware",
    code: "OD-LH-CUBE",
    dims: "545x345x360mm",
    desc: "Bold square geometry wall-hung ceramic fired at 1280°C vitreous glaze.",
    img: "/images/products/prod_cube.png",
    tier: 3,
    width: 250,
    height: 200,
  },
  {
    id: "cistern",
    name: "WY-G8601 Pneumatic Cistern Frame",
    cat: "Sanitaryware",
    code: "OD-CS-8601",
    dims: "1112x500mm Water Tank",
    desc: "EN 997 certified 400kg static load structural frame with dual-flush cistern.",
    img: "/images/products/prod_cistern.png",
    tier: 3,
    width: 280,
    height: 215,
  },
  {
    id: "olive",
    name: "OLIVE Integrated Washbasin",
    cat: "Wash Basins",
    code: "OD-BS-OLVE",
    dims: "430x480x332mm",
    desc: "Soft curved internal bowl with deep water retention volume.",
    img: "/images/products/prod_olive.png",
    tier: 3,
    width: 260,
    height: 200,
  },
  {
    id: "drain601",
    name: "MI - 601 / PB Ultra Anti-Odor Drain",
    cat: "Drains & SS Hardware",
    code: "OD-DR-601",
    dims: "150x150mm",
    desc: "Deep water seal barrier preventing odor escape, available in PVD Matt Black.",
    img: "/images/products/prod_drain_601.png",
    tier: 3,
    width: 260,
    height: 195,
  },
  {
    id: "tudor",
    name: "TUDOR LJ220 Wall-Hung Toilet",
    cat: "Sanitaryware",
    code: "OD-LH-TUD22",
    dims: "530x360x360mm",
    desc: "Architectural line with concealed mounting holes and rimless water wash.",
    img: "/images/products/prod_tudor.png",
    tier: 3,
    width: 250,
    height: 200,
  },
  {
    id: "golf",
    name: "GOLF Full Pedestal Basin Suite",
    cat: "Wash Basins",
    code: "OD-BS-GLFP",
    dims: "355x465x830mm",
    desc: "Classic pedestal ceramic suite with concealed trapway plumbing column.",
    img: "/images/products/prod_golf.png",
    tier: 3,
    width: 250,
    height: 220,
  },
  {
    id: "creta",
    name: "CRETA Two-Piece Toilet Suite",
    cat: "Sanitaryware",
    code: "OD-CR-CRTA",
    dims: "645x340x790mm",
    desc: "Reliable two-piece dual flush system with quiet quick-refill valve.",
    img: "/images/products/prod_creta.png",
    tier: 3,
    width: 250,
    height: 205,
  },
];

interface GalleryProps {
  onSelectProduct?: (prod: GalleryProduct) => void;
  fullScreen?: boolean;
}

export default function BybangInteractiveGallery({
  onSelectProduct,
  fullScreen = false,
}: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Position and Physics
  const [posX, setPosX] = useState(0);
  const velocityRef = useRef(-0.5); // Idle drift to the left
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const currentDragXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [isHoveredOverItem, setIsHoveredOverItem] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<GalleryProduct | null>(null);

  // Split products by tier
  const tier1 = useMemo(() => galleryProducts.filter((p) => p.tier === 1), []);
  const tier2 = useMemo(() => galleryProducts.filter((p) => p.tier === 2), []);
  const tier3 = useMemo(() => galleryProducts.filter((p) => p.tier === 3), []);

  // Approximate loop width for endless wrapping
  const loopWidth = 3800;

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 16.66; // Normalized to 60fps
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        // Natural inertia damping
        if (Math.abs(velocityRef.current) > 0.6) {
          velocityRef.current *= Math.pow(0.95, delta);
        } else {
          // Fall back to calm idle drifting
          const idleSpeed = isHoveredOverItem ? -0.15 : -0.65;
          velocityRef.current += (idleSpeed - velocityRef.current) * 0.05 * delta;
        }

        setPosX((prev) => {
          let next = prev + velocityRef.current * delta;
          // Wrap infinitely
          if (next < -loopWidth) next += loopWidth;
          if (next > loopWidth) next -= loopWidth;
          return next;
        });
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHoveredOverItem]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    currentDragXRef.current = clientX;
    velocityRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - currentDragXRef.current;
    currentDragXRef.current = clientX;

    // Apply immediate displacement and update velocity
    setPosX((prev) => {
      let next = prev + deltaX;
      if (next < -loopWidth) next += loopWidth;
      if (next > loopWidth) next -= loopWidth;
      return next;
    });

    velocityRef.current = deltaX * 0.9;
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") velocityRef.current += 8;
      if (e.key === "ArrowRight") velocityRef.current -= 8;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none bg-[#161C1E] border-y border-[#B8956F]/15 cursor-grab active:cursor-grabbing ${
        fullScreen ? "h-[88vh] min-h-[680px]" : "h-[740px]"
      }`}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      data-cursor="DRAG"
    >
      {/* Subtle vignette lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,149,111,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* ==================== 1. FIXED FOREGROUND EDITORIAL TEXT (Z-20) ==================== */}
      {/* All images float directly BEHIND this text, identical to bybang.co! */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 select-none px-6 text-center">
        {/* Subtle radial backdrop behind center text to ensure high contrast */}
        <div className="absolute w-[440px] h-[320px] rounded-full bg-[#161C1E]/65 blur-3xl pointer-events-none -z-10" />

        <span className="text-[11px] font-serif tracking-[0.35em] text-[#B8956F] uppercase mb-2">
          Master Catalog Collection
        </span>

        <h2 className="text-6xl sm:text-8xl md:text-9xl font-serif font-light tracking-[0.24em] text-white uppercase drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)] leading-none">
          ODELL
        </h2>

        <p className="text-lg sm:text-2xl md:text-3xl font-serif italic tracking-[0.2em] text-[#B8956F] mt-2 drop-shadow-md">
          Elegance like luxury
        </p>

        {/* Drag Hint Pill */}
        <div className="mt-8 inline-flex items-center gap-2.5 bg-[#1A2224]/85 backdrop-blur-md border border-[#B8956F]/25 px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase text-[#F4F1EA]/80 shadow-2xl">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#B8956F] animate-pulse" />
          <span>Drag left or right to explore (40+ models)</span>
        </div>
      </div>

      {/* ==================== 2. SLIDING MULTI-TIER PARALLAX STAGES (Z-10) ==================== */}

      {/* TIER 1: Top Tier (Speed factor: 1.1x) */}
      <div
        className="absolute top-[8%] left-0 flex items-center gap-8 whitespace-nowrap will-change-transform z-10 pointer-events-auto"
        style={{
          transform: `translateX(${posX * 1.1}px)`,
        }}
      >
        {/* Render 2 duplicates to guarantee infinite seamless wrapping */}
        {[...tier1, ...tier1].map((prod, idx) => (
          <div
            key={`t1-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalProduct(prod);
              if (onSelectProduct) onSelectProduct(prod);
            }}
            onMouseEnter={() => setIsHoveredOverItem(true)}
            onMouseLeave={() => setIsHoveredOverItem(false)}
            className="group relative flex-shrink-0 card-editorial p-3 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-108 hover:border-[#B8956F] hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            style={{ width: `${prod.width}px`, height: `${prod.height}px` }}
            data-cursor="VIEW"
          >
            <div className="w-full h-full flex items-center justify-center p-2 bg-[#13181A]/60 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prod.img}
                alt={prod.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Micro Badge */}
            <div className="absolute bottom-2 left-2 right-2 bg-[#161C1E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#B8956F]/15 flex items-center justify-between text-[9px]">
              <span className="font-serif text-[#F4F1EA] truncate max-w-[150px] font-medium">
                {prod.name}
              </span>
              <span className="text-[#B8956F] font-mono font-bold ml-1">
                {prod.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TIER 2: Middle Tier (Drifts directly behind center text! Speed factor: 0.88x) */}
      <div
        className="absolute top-[38%] left-0 flex items-center gap-10 whitespace-nowrap will-change-transform z-10 pointer-events-auto"
        style={{
          transform: `translateX(${posX * 0.88 + 350}px)`,
        }}
      >
        {[...tier2, ...tier2].map((prod, idx) => (
          <div
            key={`t2-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalProduct(prod);
              if (onSelectProduct) onSelectProduct(prod);
            }}
            onMouseEnter={() => setIsHoveredOverItem(true)}
            onMouseLeave={() => setIsHoveredOverItem(false)}
            className="group relative flex-shrink-0 card-editorial p-3 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-108 hover:border-[#B8956F] hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            style={{ width: `${prod.width}px`, height: `${prod.height}px` }}
            data-cursor="VIEW"
          >
            <div className="w-full h-full flex items-center justify-center p-2 bg-[#13181A]/60 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prod.img}
                alt={prod.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="absolute bottom-2 left-2 right-2 bg-[#161C1E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#B8956F]/15 flex items-center justify-between text-[9px]">
              <span className="font-serif text-[#F4F1EA] truncate max-w-[150px] font-medium">
                {prod.name}
              </span>
              <span className="text-[#B8956F] font-mono font-bold ml-1">
                {prod.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TIER 3: Bottom Tier (Speed factor: 1.25x) */}
      <div
        className="absolute top-[68%] left-0 flex items-center gap-8 whitespace-nowrap will-change-transform z-10 pointer-events-auto"
        style={{
          transform: `translateX(${posX * 1.25 + 750}px)`,
        }}
      >
        {[...tier3, ...tier3].map((prod, idx) => (
          <div
            key={`t3-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalProduct(prod);
              if (onSelectProduct) onSelectProduct(prod);
            }}
            onMouseEnter={() => setIsHoveredOverItem(true)}
            onMouseLeave={() => setIsHoveredOverItem(false)}
            className="group relative flex-shrink-0 card-editorial p-3 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-108 hover:border-[#B8956F] hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            style={{ width: `${prod.width}px`, height: `${prod.height}px` }}
            data-cursor="VIEW"
          >
            <div className="w-full h-full flex items-center justify-center p-2 bg-[#13181A]/60 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prod.img}
                alt={prod.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="absolute bottom-2 left-2 right-2 bg-[#161C1E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#B8956F]/15 flex items-center justify-between text-[9px]">
              <span className="font-serif text-[#F4F1EA] truncate max-w-[150px] font-medium">
                {prod.name}
              </span>
              <span className="text-[#B8956F] font-mono font-bold ml-1">
                {prod.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ==================== 3. DETAIL MODAL DIALOG ON CLICK ==================== */}
      <AnimatePresence>
        {activeModalProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 cursor-default"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#1A2224] border border-[#B8956F]/30 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#13181A] border border-[#B8956F]/20 flex items-center justify-center text-[#F4F1EA]/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8956F] bg-[#B8956F]/10 px-2.5 py-0.5 rounded border border-[#B8956F]/15 font-mono">
                  {activeModalProduct.cat}
                </span>
                <span className="text-xs font-mono text-[#F4F1EA]/40">
                  {activeModalProduct.code}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-normal text-white">
                {activeModalProduct.name}
              </h3>

              {/* Product Image Stage */}
              <div className="w-full h-56 bg-[#13181A] rounded-2xl my-6 flex items-center justify-center p-4 border border-[#B8956F]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalProduct.img}
                  alt={activeModalProduct.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
                />
              </div>

              {/* Dimensions & Description */}
              <div className="space-y-3 text-xs border-t border-[#B8956F]/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-[#F4F1EA]/50 font-serif">Dimensions</span>
                  <span className="font-mono text-white font-semibold">{activeModalProduct.dims}</span>
                </div>
                <p className="text-[#F4F1EA]/70 leading-relaxed text-[11px]">
                  {activeModalProduct.desc}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 pt-4 border-t border-[#B8956F]/10 flex gap-3">
                <a
                  href={`https://wa.me/918007539002?text=Hello%20ODELL,%20I%20am%20interested%20in%20${encodeURIComponent(activeModalProduct.name)}%20(${activeModalProduct.code})`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#B8956F] hover:bg-[#CFA77E] text-[#161C1E] font-serif font-bold text-xs uppercase tracking-widest py-3 rounded-xl text-center transition-colors shadow-md"
                >
                  Inquire on WhatsApp
                </a>
                <a
                  href="/NEW ALL ODELL DOC_X3_CTC-1.pdf"
                  download="ODELL_Master_Catalog.pdf"
                  className="border border-[#B8956F]/30 hover:bg-[#B8956F]/10 text-[#B8956F] text-xs font-serif px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
