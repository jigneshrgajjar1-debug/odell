"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, ChevronRight } from "lucide-react";
import LuxuryLogo from "./luxury-logo";

interface GatewayProps {
  onSelect: (track: "b2c" | "b2b") => void;
}

export default function Gateway({ onSelect }: GatewayProps) {
  const [hoveredTrack, setHoveredTrack] = useState<"b2c" | "b2b" | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050506] overflow-hidden">
      {/* Decorative luxury glowing light spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,128,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        {/* Animated Brand Entry */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <LuxuryLogo className="w-[320px] sm:w-[420px] h-auto drop-shadow-[0_4px_20px_rgba(197,168,128,0.15)]" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="text-alabaster/60 tracking-[0.25em] text-xs uppercase mt-4"
          >
            Premium Tiles, Sanitaryware & Bathware Distributor
          </motion.p>
        </motion.div>

        {/* The Choice Gateway Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Track 1: Homeowners (B2C) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredTrack("b2c")}
            onHoverEnd={() => setHoveredTrack(null)}
            onClick={() => onSelect("b2c")}
            className="relative cursor-pointer group rounded-3xl overflow-hidden glass-gateway p-8 sm:p-10 flex flex-col justify-between h-[360px] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Glowing borders & backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -inset-px rounded-3xl border border-gold/15 group-hover:border-gold/50 transition-colors duration-500 pointer-events-none" />

            <div className="flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 mb-6 group-hover:bg-gold/20 transition-all duration-300">
                <User className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-serif text-alabaster font-bold mb-3 tracking-wide">
                For Homeowners
              </h3>
              <p className="text-alabaster/60 text-sm leading-relaxed">
                Design your private sanctuary. Explore curated inspiration galleries, shop bespoke luxury rooms, and book private VIP showroom consultations.
              </p>
            </div>

            <div className="flex items-center text-gold font-medium text-sm tracking-widest uppercase gap-2 mt-6">
              Enter Atelier
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </motion.div>

          {/* Track 2: Trade Professionals (B2B) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredTrack("b2b")}
            onHoverEnd={() => setHoveredTrack(null)}
            onClick={() => onSelect("b2b")}
            className="relative cursor-pointer group rounded-3xl overflow-hidden glass-gateway p-8 sm:p-10 flex flex-col justify-between h-[360px] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Glowing borders & backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-glow/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -inset-px rounded-3xl border border-gold/15 group-hover:border-gold/50 transition-colors duration-500 pointer-events-none" />

            <div className="flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 mb-6 group-hover:bg-gold/20 transition-all duration-300">
                <Briefcase className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-serif text-alabaster font-bold mb-3 tracking-wide">
                For Trade Professionals
              </h3>
              <p className="text-alabaster/60 text-sm leading-relaxed">
                Empower your projects. Access exclusive trade discounts, download high-definition BIM/CAD assets, request physical sample boxes, and check bulk inventory.
              </p>
            </div>

            <div className="flex items-center text-gold font-medium text-sm tracking-widest uppercase gap-2 mt-6">
              Enter Trade Portal
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>

        {/* Global Footer Trademark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-alabaster/80 font-medium"
        >
          © 2026 ODELL INTERNATIONAL EAST AFRICA. ALL RIGHTS RESERVED.
        </motion.div>
      </div>
    </div>
  );
}
