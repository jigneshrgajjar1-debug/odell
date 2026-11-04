"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, SlidersHorizontal, Eye } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";
import { getAssetPath } from "@/lib/basePath";

const galleryProducts = [
  { id: 1, name: "KANTO Tabletop Basin", cat: "Sanitaryware", size: "390x390x135mm", style: "Table Top", image: "/images/bathroom_b.png", desc: "Fine-walled rounded ceramic table top basin with a silky matte finish." },
  { id: 2, name: "SERENA Shower Set", cat: "Bathware", functions: "3 Functions", style: "Brushed Gold", image: "/images/bathroom_b.png", desc: "Premium hot and cold thermostatic rain shower set in a luxurious gold finish." },
  { id: 3, name: "LIBRA Wall-Hung Toilet", cat: "Sanitaryware", size: "490x350x360mm", style: "Wall Hung", image: "/images/bathroom_a.png", desc: "Sleek rimless wall-mounted toilet bowl with soft-close seat configuration." },
  { id: 4, name: "PRADO One-Piece Toilet", cat: "Sanitaryware", size: "680x360x730mm", style: "One Piece", image: "/images/bathroom_a.png", desc: "Luxury one-piece ceramic toilet with dual-flush pneumatic mechanism." },
  { id: 5, name: "TESORO Shower Set", cat: "Bathware", functions: "3 Functions", style: "Matte Black", image: "/images/bathroom_b.png", desc: "Statement matte-black 3-function hot and cold thermostatic shower system." },
  { id: 6, name: "CUBE Wall-Hung Toilet", cat: "Sanitaryware", size: "540x345x360mm", style: "Wall Hung", image: "/images/bathroom_a.png", desc: "Geometric block-style rimless wall-hung toilet bowl for modern bathrooms." },
  { id: 7, name: "CUBEX Tabletop Basin", cat: "Sanitaryware", size: "380x380x115mm", style: "Table Top", image: "/images/bathroom_b.png", desc: "Square-profile elegant tabletop washbasin with high-gloss porcelain glaze." },
  { id: 8, name: "STYLEM Tabletop Basin", cat: "Sanitaryware", size: "500x380x135mm", style: "Table Top", image: "/images/bathroom_b.png", desc: "Wide designer oval washbasin tailored for luxury master suites." },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Sanitaryware", "Bathware", "Tiles"];
  const filteredProducts = filter === "All" ? galleryProducts : galleryProducts.filter((p) => p.cat === filter);

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
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between border-b border-gold/15 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Elegance
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
              Inspiration Gallery
            </h1>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs uppercase tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  filter === cat
                    ? "border-gold bg-gold text-obsidian font-bold"
                    : "border-alabaster/10 bg-black/20 text-alabaster/60 hover:border-gold/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px]"
            >
              {/* Product Visual */}
              <div className="relative aspect-[4/3] bg-black/40 overflow-hidden border-b border-gold/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetPath(prod.image)}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold text-gold px-2 py-0.5 bg-obsidian/80 border border-gold/15 rounded backdrop-blur">
                  {prod.style}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-gold/60">
                    {prod.cat}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1 mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-alabaster/60 text-xs leading-relaxed mb-4">
                    {prod.desc}
                  </p>
                </div>
                <div className="border-t border-alabaster/5 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-xs text-gold font-medium">
                    {prod.size || prod.functions}
                  </span>
                  <Link
                    href="/b2c/shop-by-room"
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-bold text-alabaster/55 hover:text-gold transition-colors duration-200"
                  >
                    <Eye className="w-3.5 h-3.5" /> See in Room
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
