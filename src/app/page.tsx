"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  FileText,
  PhoneCall,
  Check,
  Building2,
  Globe,
  Headphones,
  BookOpen,
  ArrowRight,
  Sparkles,
  Phone,
  Layers,
  ShieldCheck,
  Eye,
  Sliders,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import LuxuryLogo from "@/components/luxury-logo";
import RoomPan from "@/components/room-pan";
import ShowroomScheduler from "@/components/showroom-scheduler";
import MaterialConfigurator from "@/components/material-configurator";
import BybangInteractiveGallery from "@/components/bybang-interactive-gallery";
import { getAssetPath } from "@/lib/basePath";

// Master search database containing all products from the PDF
interface SearchProduct {
  name: string;
  cat: string;
  code: string;
  desc: string;
}

const searchProducts: SearchProduct[] = [
  // Toilets
  { name: "PRADO - 8609 One-Piece Toilet", cat: "Water Closets", code: "OD-PR-8609", desc: "680x400x730mm, P-Trap 180mm / S-Trap 250mm" },
  { name: "HILTON - 8612 One-Piece Toilet", cat: "Water Closets", code: "OD-HI-8612", desc: "710x390x770mm, P-Trap 180mm / S-Trap 250mm" },
  { name: "TESLA - 8615 One-Piece Toilet", cat: "Water Closets", code: "OD-TE-8615", desc: "700x375x760mm, Vitreous China double glaze" },
  { name: "SELTOS One-Piece Toilet", cat: "Water Closets", code: "OD-SE-SLTS", desc: "670x330x720mm, Rimless ergonomic bowl" },
  { name: "ALDO - 9001 One-Piece Toilet", cat: "Water Closets", code: "OD-AL-9001", desc: "665x370x790mm, Dual flush Vitreous China" },
  { name: "LIBRA Wall-Hung Rimless Toilet", cat: "Water Closets", code: "OD-LH-LBRA", desc: "505x355x385mm, Wall outlet 180mm" },
  { name: "CUBE Wall-Hung Rimless Toilet", cat: "Water Closets", code: "OD-LH-CUBE", desc: "545x345x360mm, Ultra-clean glaze" },
  { name: "ARMANI LJ205S Wall-Hung Toilet", cat: "Water Closets", code: "OD-LH-ARM20", desc: "510x345x365mm, European architectural line" },
  { name: "WY-G8601 Pneumatic Cistern Frame", cat: "Water Closets", code: "OD-CS-8601", desc: "1112x500mm Water tank, 400kg EN 997 load rated" },

  // Basins
  { name: "KANZO Tabletop Basin", cat: "Wash Basins", code: "OD-BS-KNZO", desc: "360x705x135mm oval thin-wall basin" },
  { name: "QUBIX Tabletop Basin", cat: "Wash Basins", code: "OD-BS-QBX", desc: "350x625x115mm slim rectangular basin" },
  { name: "STYLEN Tabletop Basin", cat: "Wash Basins", code: "OD-BS-STLN", desc: "330x455x130mm compact luxury basin" },
  { name: "EVON Tabletop Basin", cat: "Wash Basins", code: "OD-BS-EVON", desc: "420x420x130mm circular ceramic basin" },
  { name: "OPEL Integrated Basin", cat: "Wash Basins", code: "OD-BS-OPEL", desc: "430x510x363mm integrated vitreous basin" },
  { name: "BENTLY Corner Basin", cat: "Wash Basins", code: "OD-BS-BNTL", desc: "365x377x151mm space-saving corner basin" },

  // Faucets & Showers
  { name: "TESORO - S0844A 3-Function Shower", cat: "Luxury Faucets", code: "OD-SH-TESO", desc: "Thermostatic hot & cold in Brushed Gunmetal" },
  { name: "GRAZIA - S0597 3-Function Shower", cat: "Luxury Faucets", code: "OD-SH-GRAZ", desc: "Minimalist square rain shower with handheld" },
  { name: "SERENA - S0733A 3-Function Shower", cat: "Luxury Faucets", code: "OD-SH-SERE", desc: "Polished chrome overhead rain system" },
  { name: "VANESSA - S0806 3-Function Shower", cat: "Luxury Faucets", code: "OD-SH-VANE", desc: "Integrated storage shelf mixer console" },

  // Mirrors & Bathtubs
  { name: "L10001 Triple LED Mirror", cat: "LED Mirrors", code: "OD-MR-10001", desc: "500x700mm black aluminum frame with defogger" },
  { name: "L10031 Oval Backlit LED Mirror", cat: "LED Mirrors", code: "OD-MR-10031", desc: "600x800mm ambient halo lighting" },
  { name: "8064 L Jacuzzi Massage Bathtub", cat: "Bathtubs", code: "OD-BT-8064", desc: "1700x800x600mm luxury whirlpool jets" },
  { name: "8027 L Circular Jacuzzi Spa", cat: "Bathtubs", code: "OD-BT-8027", desc: "1500x1500x600mm round resort hydro spa" },
  { name: "MI-703 Capsule Drain AISI 304", cat: "Drains", code: "OD-DR-703", desc: "100x600mm linear drain in Satin & PVD Black" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Modal / interactive tab triggers
  const [activeSpaceTab, setActiveSpaceTab] = useState<"residential" | "commercial">("residential");
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);

  // Callback form state
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbVertical, setCbVertical] = useState("Institutional Business");
  const [cbSuccess, setCbSuccess] = useState(false);

  // Parallax on hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (cbName && cbPhone) {
      setCbSuccess(true);
      const text = `Hello ODELL,%0AI would like to inquire about ${encodeURIComponent(cbVertical)}.%0AName: ${encodeURIComponent(cbName)}%0APhone: ${encodeURIComponent(cbPhone)}`;
      window.open(`https://wa.me/918007539002?text=${text}`, "_blank");
      setTimeout(() => {
        setCbSuccess(false);
        setCbName("");
        setCbPhone("");
      }, 5000);
    }
  };

  const filteredSearch = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className="relative min-h-screen bg-[#161C1E] text-[#F4F1EA] selection:bg-[#B8956F]/30 selection:text-[#F4F1EA]">
      {/* ==================== 1. MINIMALIST EDITORIAL NAVBAR ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#161C1E]/80 backdrop-blur-md border-b border-[#B8956F]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo in refined high-contrast Serif */}
          <Link href="/" className="group flex flex-col text-left cursor-pointer" data-cursor="ODELL">
            <span className="text-2xl font-serif tracking-[0.28em] font-normal text-white uppercase group-hover:text-[#B8956F] transition-colors">
              ODELL
            </span>
            <span className="text-[9px] font-serif italic tracking-[0.18em] text-[#B8956F] -mt-0.5">
              Elegance like luxury
            </span>
          </Link>

          {/* Discreet Live Product Search */}
          <div className="relative hidden md:block w-72">
            <div className="flex items-center bg-[#1A2224]/80 border border-[#B8956F]/15 rounded-full px-3.5 py-1.5 focus-within:border-[#B8956F] transition-colors">
              <Search className="w-3.5 h-3.5 text-[#B8956F]/70 mr-2" />
              <input
                type="text"
                placeholder="Search Prado, Kanzo, Serena..."
                value={searchQuery}
                onFocus={() => setShowAutocomplete(true)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 250)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#F4F1EA] placeholder-[#F4F1EA]/35 focus:outline-none"
              />
            </div>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showAutocomplete && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#1A2224] border border-[#B8956F]/20 rounded-2xl overflow-hidden shadow-2xl z-50 text-left"
                >
                  {filteredSearch.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto divide-y divide-[#F4F1EA]/5">
                      {filteredSearch.map((p) => (
                        <div
                          key={p.code}
                          onClick={() => {
                            document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                            setSearchQuery("");
                          }}
                          className="p-3 hover:bg-[#B8956F]/10 cursor-pointer transition-colors"
                        >
                          <span className="text-[8px] uppercase tracking-wider font-bold text-[#B8956F] px-1.5 py-0.5 bg-[#B8956F]/10 rounded float-right">
                            {p.cat}
                          </span>
                          <strong className="text-xs text-white block">{p.name}</strong>
                          <span className="text-[10px] text-[#F4F1EA]/50 font-mono">{p.desc}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 text-center text-xs text-[#F4F1EA]/40">
                      No matches found.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Minimalist Navigation Links (Matching Mockup) */}
          <nav className="flex items-center gap-6 sm:gap-8 text-xs font-serif tracking-wider text-[#F4F1EA]/80">
            <a href="#categories" className="hover:text-[#B8956F] transition-colors">Collections</a>
            <Link href="/products" className="hover:text-[#B8956F] transition-colors">Products</Link>
            <a href="#heritage" className="hover:text-[#B8956F] transition-colors">About</a>
            <a href="#spaces" className="hover:text-[#B8956F] transition-colors">Spaces</a>
            <a href="#b2b-service" className="hover:text-[#B8956F] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* ==================== 2. CINEMATIC HERO SECTION (Directly matching the Mockup) ==================== */}
      <section
        ref={heroRef}
        className="relative h-[92vh] min-h-[640px] w-full flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Cinematic Backdrop with Dual Glowing Oval Mirrors */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath("/images/editorial/hero_dark_suite.jpg")}
            alt="ODELL Ultra-Modern Dark Glass and Matte Black Luxury Suite"
            className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161C1E] via-transparent to-black/40 pointer-events-none" />
        </motion.div>

        {/* Center Typography (Matching Mockup exactly) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl select-none"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-[0.24em] text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            ODELL
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-serif italic text-[#B8956F] tracking-[0.16em] mt-2 drop-shadow-md">
            Elegance like luxury
          </p>
        </motion.div>

        {/* Bottom Right Minimalist Button "[ Discover more ]" */}
        <div className="absolute bottom-10 right-8 z-20">
          <a
            href="#storytelling"
            className="inline-flex items-center gap-2 border border-[#F4F1EA]/30 hover:border-[#B8956F] hover:bg-[#B8956F]/10 text-xs font-serif tracking-widest text-[#F4F1EA] px-6 py-2.5 rounded-lg backdrop-blur-sm transition-all duration-300"
            data-cursor="DISCOVER"
          >
            Discover more
          </a>
        </div>
      </section>

      {/* ==================== 3. EDITORIAL SCROLL PHOTO STORYTELLING (Matching New User Mockup) ==================== */}
      <section id="storytelling" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/10">
        {/* Subtle Architectural Tile Grid Lines from Mockup */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(184,149,111,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(184,149,111,0.05)_1px,transparent_1px)] bg-[size:160px_160px] opacity-60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Stacked Editorial Typography */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8956F] uppercase">
              Brand Philosophy
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-normal text-white leading-[1.1] tracking-tight">
              Editorial scroll <br />
              photo <br />
              Storytelling <br />
              <span className="italic text-[#B8956F]">Sticky</span>
            </h2>

            <p className="text-sm text-[#F4F1EA]/65 leading-relaxed font-sans max-w-md pt-2">
              We design and produce timeless sanitaryware where innovation, aesthetics, and everyday comfort come together in perfect harmony. Each piece is crafted from fine Vitreous China double-glazed at 1280°C.
            </p>

            <div className="pt-2">
              <a
                href={getAssetPath("/NEW ALL ODELL DOC_X3_CTC-1.pdf")}
                download="ODELL_Master_Catalog.pdf"
                className="inline-flex items-center gap-2 text-xs font-serif tracking-widest text-[#B8956F] hover:text-white uppercase transition-colors"
                data-cursor="CATALOG"
              >
                <span>Read Master Catalog (1.4 MB)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Single Wide Editorial Photograph (Directly matching new uploaded design) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#B8956F]/20 shadow-2xl bg-[#13181A] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/story_vanity_editorial.png")}
                alt="ODELL Editorial Vanity Sanctuary"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161C1E]/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3.5. KINETIC SIDE-TO-SIDE DRAG GALLERY (BYBANG.CO STYLE) ==================== */}
      <section className="relative z-10 w-full py-10 bg-[#141A1C]">
        <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8956F] uppercase">
              Kinetic Studio Gallery
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white mt-1">
              Interactive Catalog Drift (40+ Models)
            </h3>
            <p className="text-xs text-[#F4F1EA]/50 mt-1">
              Drag mouse horizontally from left to right or right to left. All images glide smoothly behind the center typography.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-serif tracking-widest text-[#B8956F] hover:text-white uppercase flex items-center gap-1.5 transition-colors group"
          >
            <span>Open Fullscreen Products Page</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Full-Width Interactive Drag Canvas with 40+ catalog products */}
        <BybangInteractiveGallery />
      </section>

      {/* ==================== 4. EXPLORE PRODUCT CATEGORIES (4-Card Horizontal Grid) ==================== */}
      <section id="categories" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/10">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-wide">
            Explore Product Categories
          </h2>
        </div>

        {/* 4 Cards Grid (Matching Mockup) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* Card 1: Water Closets */}
          <Link
            href="/b2b/catalog"
            className="group card-editorial overflow-hidden flex flex-col justify-between"
            data-cursor="TOILETS"
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden bg-[#13181A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/cat_water_closets.png")}
                alt="Water Closets"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-serif text-white block group-hover:text-[#B8956F] transition-colors">
                  Water Closets
                </span>
                <span className="text-[10px] text-[#F4F1EA]/40 font-sans block mt-0.5">
                  Prado, Hilton & Libra Wall-Hung
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B8956F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Card 2: Designer Wash Basins */}
          <Link
            href="/b2b/catalog"
            className="group card-editorial overflow-hidden flex flex-col justify-between"
            data-cursor="BASINS"
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden bg-[#13181A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/cat_designer_basins.png")}
                alt="Designer Wash Basins"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-serif text-white block group-hover:text-[#B8956F] transition-colors">
                  Designer Wash Basins
                </span>
                <span className="text-[10px] text-[#F4F1EA]/40 font-sans block mt-0.5">
                  Kanzo, Qubix & Thin-Profile
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B8956F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Card 3: Luxury Faucets */}
          <Link
            href="/b2b/catalog"
            className="group card-editorial overflow-hidden flex flex-col justify-between"
            data-cursor="FAUCETS"
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden bg-[#13181A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/cat_luxury_faucets.png")}
                alt="Luxury Faucets & Showers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-serif text-white block group-hover:text-[#B8956F] transition-colors">
                  Luxury Faucets
                </span>
                <span className="text-[10px] text-[#F4F1EA]/40 font-sans block mt-0.5">
                  Tesoro, Serena & 3-Function Showers
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B8956F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Card 4: LED Mirrors */}
          <Link
            href="/b2b/catalog"
            className="group card-editorial overflow-hidden flex flex-col justify-between"
            data-cursor="MIRRORS"
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden bg-[#13181A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/cat_led_mirrors.png")}
                alt="LED Mirrors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-sm font-serif text-white block group-hover:text-[#B8956F] transition-colors">
                  LED Mirrors
                </span>
                <span className="text-[10px] text-[#F4F1EA]/40 font-sans block mt-0.5">
                  L10001, L10031 & Defoggers
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B8956F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>
      </section>

      {/* ==================== 5. EXPLORE BY SPACE (2-Card Cinematic Grid) ==================== */}
      <section id="spaces" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-wide">
              Explore by Space
            </h2>
            <p className="text-xs text-[#F4F1EA]/50 mt-1">
              Curated environments engineered for private sanctuaries and high-traffic hospitality suites.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowVirtualTour(!showVirtualTour)}
              className="text-xs font-serif tracking-wider border border-[#B8956F]/30 hover:border-[#B8956F] text-[#B8956F] px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              {showVirtualTour ? "Hide 180° Tour" : "Launch 180° Tour"}
            </button>
            <button
              onClick={() => setShowConfigurator(!showConfigurator)}
              className="text-xs font-serif tracking-wider bg-[#B8956F]/15 hover:bg-[#B8956F]/25 text-[#B8956F] px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              {showConfigurator ? "Close Configurator" : "Custom Configurator"}
            </button>
          </div>
        </div>

        {/* 2 Wide Cinematic Space Cards (Matching Mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Residential */}
          <div
            onClick={() => setShowVirtualTour(true)}
            className="group card-editorial overflow-hidden cursor-pointer"
            data-cursor="RESIDENTIAL"
          >
            <div className="w-full h-64 sm:h-80 overflow-hidden bg-[#13181A] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/space_residential.png")}
                alt="Residential Bathroom Sanctuary"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161C1E] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif text-white block">Residential</h3>
                  <span className="text-[11px] text-[#F4F1EA]/60 font-sans block mt-0.5">
                    Private master suites, freestanding jacuzzis & bespoke powder rooms
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1A2224]/80 border border-[#B8956F]/30 flex items-center justify-center text-[#B8956F] group-hover:bg-[#B8956F] group-hover:text-[#161C1E] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Commercial/Hospitality */}
          <div
            onClick={() => setShowVirtualTour(true)}
            className="group card-editorial overflow-hidden cursor-pointer"
            data-cursor="HOSPITALITY"
          >
            <div className="w-full h-64 sm:h-80 overflow-hidden bg-[#13181A] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAssetPath("/images/editorial/space_commercial.png")}
                alt="Commercial and Hospitality Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161C1E] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif text-white block">Commercial/Hospitality</h3>
                  <span className="text-[11px] text-[#F4F1EA]/60 font-sans block mt-0.5">
                    5-Star hotels, luxury resorts & corporate executive washrooms
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1A2224]/80 border border-[#B8956F]/30 flex items-center justify-center text-[#B8956F] group-hover:bg-[#B8956F] group-hover:text-[#161C1E] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Interactive 180° Virtual Tour */}
        <AnimatePresence>
          {showVirtualTour && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 overflow-hidden border-t border-[#B8956F]/15 pt-8"
            >
              <div className="text-center mb-6">
                <span className="text-[10px] tracking-[0.25em] font-bold text-[#B8956F] uppercase">
                  180° Panoramic Sweep Tour
                </span>
                <p className="text-xs text-[#F4F1EA]/60 mt-1">
                  Drag or use the slider below to inspect Prado toilets, Serena shower sets, and Kanzo tabletop basins.
                </p>
              </div>
              <div className="flex justify-center">
                <RoomPan />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible Sanctuary Material Configurator */}
        <AnimatePresence>
          {showConfigurator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 overflow-hidden border-t border-[#B8956F]/15 pt-8"
            >
              <div className="text-center mb-6">
                <span className="text-[10px] tracking-[0.25em] font-bold text-[#B8956F] uppercase">
                  Custom Material & Budget Configurator
                </span>
                <p className="text-xs text-[#F4F1EA]/60 mt-1">
                  Select finishes, inspect live estimates, and configure your personal sanctuary.
                </p>
              </div>
              <div className="flex justify-center">
                <MaterialConfigurator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ==================== 6. B2B SERVICE BAR (Matching Mockup with Gold Highlight Card) ==================== */}
      <section id="b2b-service" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/10">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-wide">
            B2B service bar
          </h2>
        </div>

        {/* 4 Horizontal Cards (Matching Mockup exactly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Institutional Business */}
          <div className="card-editorial p-6 flex flex-col justify-between min-h-[170px] hover:border-[#B8956F]/40 transition-all">
            <div>
              <Building2 className="w-5 h-5 text-[#B8956F] mb-4" />
              <strong className="text-sm font-serif text-white block mb-1.5">
                Institutional Business
              </strong>
              <p className="text-[11px] text-[#F4F1EA]/55 leading-relaxed font-sans">
                Bespoke refined turnkey supply and professional engineering specifications.
              </p>
            </div>
            <a
              href="mailto:sf.vrushabhm@gmail.com?subject=Institutional%20Business%20Inquiry"
              className="text-[10px] text-[#B8956F] font-serif uppercase tracking-wider mt-4 hover:underline"
            >
              Inquire Tender &rarr;
            </a>
          </div>

          {/* Card 2: International Business (Highlighted Gold Card from Mockup) */}
          <div className="bg-[#9E8363] text-[#161C1E] rounded-2xl p-6 flex flex-col justify-between min-h-[170px] shadow-xl hover:brightness-105 transition-all">
            <div>
              <Globe className="w-5 h-5 text-[#161C1E] mb-4" />
              <strong className="text-sm font-serif font-bold text-[#161C1E] block mb-1.5">
                International Business
              </strong>
              <p className="text-[11px] text-[#161C1E]/80 leading-relaxed font-sans font-medium">
                Export partnerships and regional distribution networks for institutional business.
              </p>
            </div>
            <a
              href="https://wa.me/918007539002?text=Hello%20ODELL,%20inquiry%20for%20International%20Distribution"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-[#161C1E] font-serif uppercase tracking-wider font-bold mt-4 hover:underline"
            >
              Export Desk &rarr;
            </a>
          </div>

          {/* Card 3: Service & Support */}
          <div className="card-editorial p-6 flex flex-col justify-between min-h-[170px] hover:border-[#B8956F]/40 transition-all">
            <div>
              <Headphones className="w-5 h-5 text-[#B8956F] mb-4" />
              <strong className="text-sm font-serif text-white block mb-1.5">
                Service & Support
              </strong>
              <p className="text-[11px] text-[#F4F1EA]/55 leading-relaxed font-sans">
                Direct technical consultation, on-site installation guidance, and warranty support.
              </p>
            </div>
            <a
              href="tel:+918007539002"
              className="text-[10px] text-[#B8956F] font-serif uppercase tracking-wider mt-4 hover:underline"
            >
              +91 8007539002 &rarr;
            </a>
          </div>

          {/* Card 4: Digital Catalogue */}
          <div className="card-editorial p-6 flex flex-col justify-between min-h-[170px] hover:border-[#B8956F]/40 transition-all">
            <div>
              <BookOpen className="w-5 h-5 text-[#B8956F] mb-4" />
              <strong className="text-sm font-serif text-white block mb-1.5">
                Digital Catalogue
              </strong>
              <p className="text-[11px] text-[#F4F1EA]/55 leading-relaxed font-sans">
                Official 13.4MB master PDF, BIM architectural assets, and technical drawings.
              </p>
            </div>
            <a
              href={getAssetPath("/NEW ALL ODELL DOC_X3_CTC-1.pdf")}
              download="ODELL_Master_Catalog.pdf"
              className="text-[10px] text-[#B8956F] font-serif uppercase tracking-wider mt-4 hover:underline flex items-center gap-1 font-bold"
            >
              <Download className="w-3 h-3" /> Download PDF &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 7. BRAND HERITAGE & QUICK CALL BACK ==================== */}
      <section id="heritage" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Heritage text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8956F] uppercase">
              Founded 1960 • Pioneer in 1962
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              Over 60 Years of Vitreous China Excellence
            </h3>
            <p className="text-xs sm:text-sm text-[#F4F1EA]/65 leading-relaxed">
              Our journey began in 1960 as <strong>Hindustan Twyfords Limited</strong>, in collaboration with <strong>Twyfords, UK</strong>. In 1962, we became the first company to introduce Vitreous China Sanitaryware in India. Today, ODELL continues to define modern sanctuaries through precision double glazing, EN 997 load-certified frames, and timeless European geometry.
            </p>
          </div>

          {/* Quick Callback dispatch */}
          <div className="lg:col-span-5 card-editorial p-6 sm:p-8">
            <h4 className="text-lg font-serif text-white mb-2">Request A Technical Call Back</h4>
            <p className="text-[11px] text-[#F4F1EA]/50 mb-5">
              Leave your details to connect directly with our engineering desk on WhatsApp.
            </p>

            <form onSubmit={handleCallback} className="space-y-3.5">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={cbName}
                onChange={(e) => setCbName(e.target.value)}
                className="w-full bg-[#13181A] border border-[#B8956F]/20 text-[#F4F1EA] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#B8956F]"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number (+91...)"
                value={cbPhone}
                onChange={(e) => setCbPhone(e.target.value)}
                className="w-full bg-[#13181A] border border-[#B8956F]/20 text-[#F4F1EA] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#B8956F]"
              />
              <select
                value={cbVertical}
                onChange={(e) => setCbVertical(e.target.value)}
                className="w-full bg-[#13181A] border border-[#B8956F]/20 text-[#F4F1EA] px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#B8956F]"
              >
                <option value="Institutional Business">Institutional Project Supply</option>
                <option value="International Business">International Export</option>
                <option value="Residential Sanctuary">Residential Sanctuary</option>
                <option value="Architectural Specification">Architectural Specification</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#B8956F] hover:bg-[#CFA77E] text-[#161C1E] font-serif font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-colors cursor-pointer"
              >
                {cbSuccess ? "Dispatched to WhatsApp..." : "Submit Callback Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== 8. EDITORIAL FOOTER (Directly matching the Mockup) ==================== */}
      <footer className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-[#B8956F]/15">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Col (Left) */}
          <div className="md:col-span-4">
            <span className="text-3xl font-serif tracking-[0.24em] font-normal text-white uppercase block">
              ODELL
            </span>
            <span className="text-xs font-serif italic tracking-[0.16em] text-[#B8956F] block mt-1">
              Elegance like luxury
            </span>
            <p className="text-[11px] text-[#F4F1EA]/45 mt-4 max-w-xs leading-relaxed">
              Timeless vitreous china sanitaryware, designer faucets, hydromassage jacuzzis, and architectural hardware.
            </p>
          </div>

          {/* Links Grid: Company, Services, Resources */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 text-xs">
            {/* Company */}
            <div>
              <strong className="font-serif text-[#F4F1EA] block mb-3 text-xs tracking-wider font-semibold">
                Company
              </strong>
              <ul className="space-y-2 text-[#F4F1EA]/55 text-[11px]">
                <li><a href="#heritage" className="hover:text-[#B8956F]">About Us</a></li>
                <li><a href="#heritage" className="hover:text-[#B8956F]">Privacy Services</a></li>
                <li><a href="#heritage" className="hover:text-[#B8956F]">Company</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <strong className="font-serif text-[#F4F1EA] block mb-3 text-xs tracking-wider font-semibold">
                Services
              </strong>
              <ul className="space-y-2 text-[#F4F1EA]/55 text-[11px]">
                <li><a href="#b2b-service" className="hover:text-[#B8956F]">Events</a></li>
                <li><a href="/b2b/catalog" className="hover:text-[#B8956F]">Resources</a></li>
                <li><a href="#b2b-service" className="hover:text-[#B8956F]">Product Service</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <strong className="font-serif text-[#F4F1EA] block mb-3 text-xs tracking-wider font-semibold">
                Resources
              </strong>
              <ul className="space-y-2 text-[#F4F1EA]/55 text-[11px]">
                <li><a href="tel:+918007539002" className="hover:text-[#B8956F]">Contact</a></li>
                <li><a href="mailto:sf.vrushabhm@gmail.com" className="hover:text-[#B8956F]">Press</a></li>
                <li><a href="#b2b-service" className="hover:text-[#B8956F]">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Right: Socials */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-end h-full">
            {/* Social handles */}
            <div className="flex items-center gap-3 text-xs text-[#F4F1EA]/60">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#B8956F]">Facebook</a>
              <span>•</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#B8956F]">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#B8956F]/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#F4F1EA]/40">
          <div>© 2026 ODELL. All rights reserved. @odell</div>
          <div className="mt-2 sm:mt-0 font-serif italic text-[#B8956F]">Elegance like luxury</div>
        </div>
      </footer>
    </main>
  );
}
