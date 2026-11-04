"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Key, Mail, CheckCircle } from "lucide-react";
import LuxuryLogo from "@/components/luxury-logo";

export default function B2BLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <main className="min-h-screen bg-obsidian text-alabaster flex flex-col justify-between">
        <header className="w-full bg-obsidian/70 backdrop-blur-md border-b border-gold/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <LuxuryLogo width={160} height={48} color="gold" />
            <button
              onClick={() => setLoggedIn(false)}
              className="text-xs uppercase tracking-widest text-alabaster/60 hover:text-gold"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-xl glass-panel rounded-3xl p-10 text-center border border-gold/30 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-3">Welcome to the Trade Portal</h3>
            <p className="text-alabaster/60 text-sm leading-relaxed mb-8">
              Logged in successfully as <strong className="text-white">{email}</strong>. You now have full access to exclusive B2B trade catalogs, bulk logistics quotes, and direct architect CAD assets.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/b2b/catalog"
                className="bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest py-4 rounded-xl text-center transition-colors duration-300"
              >
                Bulk Catalog
              </Link>
              <Link
                href="/b2b/specs"
                className="border border-gold/25 hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest py-4 rounded-xl text-center transition-all duration-300"
              >
                Technical Specs
              </Link>
            </div>
          </div>
        </div>

        <footer className="py-6 text-center text-[10px] text-alabaster/20 uppercase tracking-widest">
          © 2026 ODELL INTERNATIONAL EAST AFRICA • SECURE ENCRYPTED CHANNEL
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian text-alabaster flex flex-col justify-between">
      {/* Premium Navbar */}
      <header className="w-full bg-obsidian/70 backdrop-blur-md border-b border-gold/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <LuxuryLogo width={160} height={48} color="gold" />
          <Link href="/b2b/specs" className="border border-gold/25 hover:bg-gold/10 text-gold font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg text-center transition-all duration-300">
            Tech Specs
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-gold/10 shadow-2xl">
          <div className="mb-8 text-center">
            <span className="text-[9px] tracking-[0.25em] font-bold text-gold uppercase flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Verified Channels
            </span>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Trade Login
            </h1>
            <p className="text-alabaster/50 text-xs mt-2 leading-relaxed">
              Exclusively for real estate developers, building contractors, architects, and designers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gold/60 mb-2 block">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gold/45" />
                <input
                  type="email"
                  required
                  placeholder="name@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121214] border border-alabaster/15 text-alabaster pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gold/60 block">
                  Portal Password
                </label>
                <a href="#" className="text-[10px] uppercase tracking-wider text-gold hover:text-white transition-colors duration-200">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gold/45" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121214] border border-alabaster/15 text-alabaster pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-colors duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.2)]"
              >
                Access Trade Portal
              </button>
            </div>
          </form>

          {/* Trade Signup Link */}
          <div className="text-center mt-6 pt-6 border-t border-alabaster/5 text-xs text-alabaster/50">
            Don't have a Trade Account?{" "}
            <a href="#" className="text-gold font-bold hover:underline">
              Apply for credentials
            </a>
          </div>
        </div>
      </div>

      {/* Global Concierge Footer */}
      <footer className="py-6 text-center text-[10px] text-alabaster/20 uppercase tracking-widest">
        © 2026 ODELL INTERNATIONAL EAST AFRICA • SECURE ENCRYPTED CHANNEL
      </footer>
    </main>
  );
}
