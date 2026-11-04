"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Sparkles, Filter, Check, Search, PhoneCall } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";
import { getAssetPath } from "@/lib/basePath";

const catalogItems = [
  // Toilets
  { model: "PRADO - 8609", cat: "Toilets (One Piece)", dims: "680x400x730mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-PR-8609", material: "Vitreous China (1280°C)", wt: "48 kg" },
  { model: "HILTON - 8612", cat: "Toilets (One Piece)", dims: "710x390x770mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-HI-8612", material: "Vitreous China", wt: "52 kg" },
  { model: "TESLA - 8615", cat: "Toilets (One Piece)", dims: "700x375x760mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-TE-8615", material: "Vitreous China", wt: "50 kg" },
  { model: "SELTOS", cat: "Toilets (One Piece)", dims: "670x330x720mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-SE-SLTS", material: "Vitreous China", wt: "46 kg" },
  { model: "ALDO - 9001", cat: "Toilets (One Piece)", dims: "665x370x790mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-AL-9001", material: "Vitreous China", wt: "47 kg" },
  { model: "LEXUS - 9002", cat: "Toilets (Two Piece)", dims: "685x380x790mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-LE-9002", material: "Vitreous China", wt: "44 kg" },
  { model: "CRETA", cat: "Toilets (Two Piece)", dims: "645x340x790mm", trap: "P-Trap [180mm], S-Trap [250mm]", code: "OD-CR-CRTA", material: "Vitreous China", wt: "42 kg" },
  { model: "LIBRA", cat: "Toilets (Wall Hung)", dims: "505x355x385mm", trap: "Wall Outlet [180mm]", code: "OD-LH-LBRA", material: "Rimless Vitreous China", wt: "26 kg" },
  { model: "CUBE", cat: "Toilets (Wall Hung)", dims: "545x345x360mm", trap: "Wall Outlet [180mm]", code: "OD-LH-CUBE", material: "Rimless Vitreous China", wt: "29 kg" },
  { model: "ARMANI LJ205S", cat: "Toilets (Wall Hung)", dims: "510x345x365mm", trap: "Wall Outlet [180mm]", code: "OD-LH-ARM20", material: "Rimless Vitreous China", wt: "28 kg" },
  { model: "TUDOR LJ220", cat: "Toilets (Wall Hung)", dims: "530x360x360mm", trap: "Wall Outlet [180mm]", code: "OD-LH-TUD22", material: "Rimless Vitreous China", wt: "27 kg" },
  { model: "ROLEX LJ208", cat: "Toilets (Wall Hung)", dims: "510x360x350mm", trap: "Wall Outlet [180mm]", code: "OD-LH-RLX20", material: "Rimless Vitreous China", wt: "28 kg" },
  { model: "RADO LJ236", cat: "Toilets (Wall Hung)", dims: "520x360x330mm", trap: "Wall Outlet [180mm]", code: "OD-LH-RAD23", material: "Rimless Vitreous China", wt: "27 kg" },
  { model: "WY-G8601 Cistern", cat: "Cisterns & Plates", dims: "1112x500mm Tank", trap: "Pneumatic Dual-Flush (3L/6L)", code: "OD-CS-8601", material: "Structural Steel + HDPE", wt: "14.5 kg" },
  { model: "601ABS Flush Plate", cat: "Cisterns & Plates", dims: "Round Dual Actuator", trap: "Chrome / Matt Black", code: "OD-FP-601A", material: "Electroplated ABS", wt: "0.4 kg" },

  // Wash Basins
  { model: "KANZO", cat: "Basins", dims: "360x705x135mm", trap: "Table Top (Waste 45mm)", code: "OD-BS-KNZO", material: "Thin-Profile Glaze", wt: "13 kg" },
  { model: "QUBIX", cat: "Basins", dims: "350x625x115mm", trap: "Table Top (Waste 45mm)", code: "OD-BS-QBX", material: "Thin-Profile Glaze", wt: "11.5 kg" },
  { model: "STYLEN", cat: "Basins", dims: "330x455x130mm", trap: "Table Top (Waste 45mm)", code: "OD-BS-STLN", material: "Vitreous China", wt: "10 kg" },
  { model: "EVON", cat: "Basins", dims: "420x420x130mm", trap: "Table Top (Waste 45mm)", code: "OD-BS-EVON", material: "Vitreous China", wt: "10.5 kg" },
  { model: "OPEL", cat: "Basins", dims: "430x510x363mm", trap: "Integrated Basin", code: "OD-BS-OPEL", material: "Vitreous China", wt: "15 kg" },
  { model: "OLIVE", cat: "Basins", dims: "430x480x332mm", trap: "Integrated Basin", code: "OD-BS-OLVE", material: "Vitreous China", wt: "14.5 kg" },
  { model: "ARENA Pedestal", cat: "Basins", dims: "430x520x830mm", trap: "Full Pedestal", code: "OD-BS-ARNP", material: "Vitreous China", wt: "32 kg" },
  { model: "GOLF Pedestal", cat: "Basins", dims: "355x465x830mm", trap: "Full Pedestal", code: "OD-BS-GLFP", material: "Vitreous China", wt: "30 kg" },
  { model: "BENTLY", cat: "Basins", dims: "365x377x151mm", trap: "Corner Basin", code: "OD-BS-BNTL", material: "Vitreous China", wt: "8.5 kg" },

  // Shower Sets
  { model: "TESORO - S0844A", cat: "Shower Sets", dims: "Height Adjustable", trap: "Hot & Cold (3 Functions)", code: "OD-SH-TESO", material: "Brushed Gunmetal / Brass", wt: "7.2 kg" },
  { model: "GRAZIA - S0597", cat: "Shower Sets", dims: "Height Adjustable", trap: "Hot & Cold (3 Functions)", code: "OD-SH-GRAZ", material: "Chrome / Brass", wt: "6.8 kg" },
  { model: "SERENA - S0733A", cat: "Shower Sets", dims: "Height Adjustable", trap: "Hot & Cold (3 Functions)", code: "OD-SH-SERE", material: "Polished Chrome", wt: "7.1 kg" },
  { model: "VANESSA - S0806", cat: "Shower Sets", dims: "Height Adjustable + Shelf", trap: "Hot & Cold (3 Functions)", code: "OD-SH-VANE", material: "Brushed Gold / Black", wt: "7.5 kg" },
  { model: "MODA - S022A", cat: "Shower Sets", dims: "Height Adjustable", trap: "Hot & Cold (3 Functions)", code: "OD-SH-MODA", material: "Chrome / Brass", wt: "6.6 kg" },

  // Bathtubs & Jacuzzis
  { model: "8064 L Jacuzzi Massage", cat: "Bathtubs", dims: "1700x800x600mm", trap: "Dual Hydromassage Jets", code: "OD-BT-8064", material: "Sanitary Acrylic + Glass Fiber", wt: "68 kg" },
  { model: "8064 L Freestanding", cat: "Bathtubs", dims: "1700x800x600mm", trap: "Pop-Up Waste Integrated", code: "OD-BT-8064F", material: "Sanitary Acrylic", wt: "48 kg" },
  { model: "5053 L Jacuzzi Massage", cat: "Bathtubs", dims: "1700x780x580mm", trap: "Whirlpool Hydro System", code: "OD-BT-5053", material: "Sanitary Acrylic", wt: "65 kg" },
  { model: "8061 L Wide Jacuzzi", cat: "Bathtubs", dims: "1800x1200x650mm", trap: "Two-Person Hydromassage", code: "OD-BT-8061", material: "Reinforced Acrylic", wt: "82 kg" },
  { model: "8027 L Round Jacuzzi", cat: "Bathtubs", dims: "1500x1500x600mm", trap: "Circular Center Spa", code: "OD-BT-8027", material: "Reinforced Acrylic", wt: "74 kg" },

  // Linear Drains & Accessories
  { model: "MI - 703 Capsule Drain", cat: "Drains & SS Hardware", dims: "100x600mm", trap: "AISI 304 Stainless Steel", code: "OD-DR-703S", material: "Satin / PVD Black", wt: "1.2 kg" },
  { model: "MI - 733 Marble Insert", cat: "Drains & SS Hardware", dims: "100x600mm", trap: "AISI 304 Seamless Marble Inlay", code: "OD-DR-733M", material: "AISI 304 Stainless Steel", wt: "1.4 kg" },
  { model: "MI - 651 Tile Insert Drain", cat: "Drains & SS Hardware", dims: "150x150mm", trap: "AISI 304 Satin", code: "OD-DR-651T", material: "AISI 304 Stainless Steel", wt: "0.7 kg" },
  { model: "MI - 601 / PB Floor Drain Ultra", cat: "Drains & SS Hardware", dims: "150x150mm", trap: "Anti-Odor Deep Bowl", code: "OD-DR-601P", material: "PVD Matt Black", wt: "0.36 kg" },
  { model: "Sapphire SS 304 Towel Rack", cat: "Drains & SS Hardware", dims: "600mm Double Rack", trap: "Wall-Mounted (30306)", code: "OD-AC-30306", material: "Polished CP SS 304", wt: "1.8 kg" },
  { model: "Aster Matt Black Series", cat: "Drains & SS Hardware", dims: "Complete Suite (32521-32532)", trap: "Towel Rod, Hooks, Holders", code: "OD-AC-ASTER", material: "PVD Matt Black SS 304", wt: "3.5 kg" },

  // LED Mirrors & Door Locks
  { model: "L10001 Triple LED Mirror", cat: "Mirrors & Locks", dims: "500x700mm", trap: "Touch Sensor + Defogger", code: "OD-MR-10001", material: "Black Aluminum Alloy Frame", wt: "5.8 kg" },
  { model: "L10031 Oval Backlit Mirror", cat: "Mirrors & Locks", dims: "600x800mm", trap: "Ambient Warm/Cool Light", code: "OD-MR-10031", material: "HD Copper-Free Silver", wt: "6.2 kg" },
  { model: "AMH 01 Mortise Handle", cat: "Mirrors & Locks", dims: "19x22mm Round Pipe", trap: "Heavy Duty Mortise Lock", code: "OD-LK-AMH01", material: "SS 304 Stainless Steel", wt: "1.1 kg" },
  { model: "AMH 03 P Plate Handle", cat: "Mirrors & Locks", dims: "8-Inch Plate / 19mm Pipe", trap: "Euro Profile Cylinder Compatible", code: "OD-LK-AMH03P", material: "SS 304 Stainless Steel", wt: "1.4 kg" },
];

export default function BulkCatalogPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const categories = ["All", "Toilets (One Piece)", "Toilets (Wall Hung)", "Basins", "Shower Sets", "Bathtubs", "Drains & SS Hardware", "Mirrors & Locks"];

  const filteredItems = catalogItems.filter((item) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Toilets (One Piece)" && item.cat.includes("One Piece")) ||
      (filter === "Toilets (Wall Hung)" && item.cat.includes("Wall Hung")) ||
      (filter === "Basins" && item.cat.includes("Basins")) ||
      (filter === "Shower Sets" && item.cat.includes("Shower Sets")) ||
      (filter === "Bathtubs" && item.cat.includes("Bathtubs")) ||
      (filter === "Drains & SS Hardware" && item.cat.includes("Drains & SS")) ||
      (filter === "Mirrors & Locks" && item.cat.includes("Mirrors & Locks"));

    const matchesSearch =
      search === "" ||
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.material.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDownload = () => {
    setDownloading(true);
    setDownloaded(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      const link = document.createElement("a");
      link.href = getAssetPath("/NEW ALL ODELL DOC_X3_CTC-1.pdf");
      link.download = "ODELL_Master_Catalog.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-obsidian text-alabaster pb-24">
      {/* Top Utility */}
      <header className="w-full bg-[#050506] border-b border-gold/15 py-4 px-6 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <span className="text-alabaster/20">|</span>
            <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
              ODELL Trade & Institutional Portal
            </span>
          </div>
          <LuxuryLogo width={180} height={52} color="gold" />
          <div className="flex items-center gap-3">
            <a
              href="tel:+918007539002"
              className="inline-flex items-center gap-1.5 text-xs text-alabaster/70 hover:text-gold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold" /> +91 8007539002
            </a>
            <button
              onClick={handleDownload}
              className="bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading ? "Preparing..." : downloaded ? "Downloaded" : "PDF Catalog"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gold/15 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-gold uppercase bg-gold/10 px-3 py-1 rounded-full border border-gold/15">
              Comprehensive Product Master
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4 mb-2">
              B2B Trade & Project Specifications
            </h1>
            <p className="text-alabaster/60 text-xs md:text-sm max-w-2xl leading-relaxed">
              Official catalog data containing dimensions, trap offsets, weights, and technical specifications for all Vitreous China ceramics, shower systems, jacuzzis, and AISI 304 hardware.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="w-full md:w-auto bg-gradient-to-r from-gold to-[#D4AF37] hover:brightness-110 text-obsidian font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-[0_4px_25px_rgba(197,168,128,0.25)] flex items-center justify-center gap-3 transition-all cursor-pointer"
            data-cursor="DOWNLOAD"
          >
            <FileText className="w-4 h-4" />
            <span>Download Master PDF (13.4 MB)</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "bg-gold text-obsidian shadow-md font-bold"
                    : "bg-[#121214] border border-gold/15 text-alabaster/60 hover:text-white hover:border-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Prado, 8064L, AMH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121214] border border-gold/15 rounded-lg pl-10 pr-4 py-2 text-xs text-alabaster placeholder-alabaster/40 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Catalog Table */}
        <div className="mt-6 glass-panel rounded-2xl border border-gold/15 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#050506] border-b border-gold/15 text-gold text-[10px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6">Model Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Product Code</th>
                  <th className="py-4 px-6">Dimensions</th>
                  <th className="py-4 px-6">Specification / Trap</th>
                  <th className="py-4 px-6">Material Composition</th>
                  <th className="py-4 px-6 text-right">Unit Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-alabaster/5">
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gold/5 transition-colors duration-150">
                    <td className="py-4 px-6 font-semibold text-white">
                      {item.model}
                    </td>
                    <td className="py-4 px-6 text-gold/80 font-mono text-[11px]">
                      {item.cat}
                    </td>
                    <td className="py-4 px-6 font-mono text-alabaster/50 text-[11px]">
                      {item.code}
                    </td>
                    <td className="py-4 px-6 text-alabaster/80 font-mono">
                      {item.dims}
                    </td>
                    <td className="py-4 px-6 text-alabaster/70">
                      {item.trap}
                    </td>
                    <td className="py-4 px-6 text-alabaster/60 text-[11px]">
                      {item.material}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-gold/90 font-semibold">
                      {item.wt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Support Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#121214] to-[#0A0A0B] border border-gold/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">Need Bespoke Architectural BIM or CAD Files?</h3>
            <p className="text-alabaster/60 text-xs">
              Our engineering team can supply official 2D `.dwg` layouts and 3D Revit `.rvt` BIM objects for institutional tenders.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="mailto:sf.vrushabhm@gmail.com?subject=BIM%20CAD%20Request%20-%20ODELL"
              className="border border-gold/30 hover:bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all"
            >
              Email BIM Request
            </a>
            <a
              href="https://wa.me/918007539002?text=Hello%20ODELL%2C%20I%20would%20like%20to%20request%20technical%20specs"
              target="_blank"
              className="bg-gold hover:bg-gold-hover text-obsidian text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
