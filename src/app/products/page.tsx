"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search, SlidersHorizontal, Layers, FileText } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";
import BybangInteractiveGallery, { galleryProducts, GalleryProduct } from "@/components/bybang-interactive-gallery";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Sanitaryware", "Wash Basins", "Luxury Faucets", "Bathtubs", "LED Mirrors", "Drains & SS Hardware", "Architectural Locks"];

  const filtered = galleryProducts.filter((p) => {
    const matchCat = selectedCategory === "All" || p.cat.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#161C1E] text-[#F4F1EA] flex flex-col justify-between selection:bg-[#B8956F]/30 selection:text-[#F4F1EA]">
      {/* Editorial Top Bar */}
      <header className="w-full bg-[#161C1E]/90 backdrop-blur-md border-b border-[#B8956F]/15 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#B8956F] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Main Atelier
          </Link>

          <Link href="/">
            <LuxuryLogo width={180} height={50} color="gold" />
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="/NEW ALL ODELL DOC_X3_CTC-1.pdf"
              download="ODELL_Master_Catalog.pdf"
              className="bg-[#B8956F] hover:bg-[#CFA77E] text-[#161C1E] font-serif font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" /> PDF Catalog
            </a>
          </div>
        </div>
      </header>

      {/* Main Interactive bybang.co Canvas Stage */}
      <section className="relative w-full flex-1 flex flex-col justify-center">
        {/* Full-Screen Interactive Side-to-Side Drag Gallery */}
        <BybangInteractiveGallery fullScreen={true} />
      </section>

      {/* Filterable Catalog Drawer / Grid Below */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-[#B8956F]/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#B8956F] uppercase">
              The Master Index
            </span>
            <h2 className="text-3xl font-serif font-normal text-white mt-1">
              Complete Catalog Index (40+ Models)
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#B8956F]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1A2224] border border-[#B8956F]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F4F1EA] placeholder-[#F4F1EA]/40 focus:outline-none focus:border-[#B8956F]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-serif tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#B8956F] text-[#161C1E] font-bold shadow-md"
                  : "bg-[#1A2224] border border-[#B8956F]/15 text-[#F4F1EA]/60 hover:text-white hover:border-[#B8956F]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Catalog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="card-editorial p-4 flex flex-col justify-between group hover:border-[#B8956F] transition-all"
            >
              <div className="w-full h-48 bg-[#13181A] rounded-xl p-3 flex items-center justify-center overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-[#B8956F] font-mono block mb-1">
                  {prod.code} • {prod.cat}
                </span>
                <strong className="text-sm font-serif text-white block mb-1 group-hover:text-[#B8956F] transition-colors">
                  {prod.name}
                </strong>
                <span className="text-[10px] text-[#F4F1EA]/50 font-mono block">
                  {prod.dims}
                </span>
                <p className="text-[11px] text-[#F4F1EA]/60 mt-2 line-clamp-2 leading-relaxed">
                  {prod.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#B8956F]/10 flex items-center justify-between text-xs font-serif">
                <a
                  href={`https://wa.me/918007539002?text=Hello%20ODELL,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(prod.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B8956F] hover:underline"
                >
                  Inquire Quote &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#13181A] border-t border-[#B8956F]/15 py-8 px-6 text-center text-xs text-[#F4F1EA]/40 font-serif">
        <p>© 2026 ODELL. Elegance like luxury. All product dimensions certified under master catalog.</p>
      </footer>
    </main>
  );
}
