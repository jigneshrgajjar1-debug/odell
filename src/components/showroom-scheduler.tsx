"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Award, CheckCircle } from "lucide-react";

const locations = [
  { id: "flagship", name: "Flagship Design Studio", address: "Central Experience Gallery" },
  { id: "institutional", name: "Institutional & Project Center", address: "Commercial Spec Atelier" },
  { id: "tech", name: "Technical Testing & Drainage Lab", address: "AISI 304 & Vitreous China Lab" },
];

const consultationTypes = [
  { id: "home", name: "Residential Sanctuary Design", desc: "Private walkthrough for one-piece toilets, shower suites, and jacuzzis." },
  { id: "arch", name: "Architect & Project Specification", desc: "Technical session on DIN slip resistance, 400kg EN 997 frames, and BOQs." },
  { id: "vip", name: "VIP Developer & Bulk Tender", desc: "Dedicated consultation for high-rise residential & hotel projects." },
];

const timeSlots = [
  "09:30 AM - 11:00 AM",
  "11:30 AM - 01:00 PM",
  "02:30 PM - 04:00 PM",
  "04:30 PM - 06:00 PM",
];

export default function ShowroomScheduler() {
  const [selectedLoc, setSelectedLoc] = useState(locations[0].id);
  const [selectedType, setSelectedType] = useState(consultationTypes[0].id);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0]);
  const [date, setDate] = useState("2026-11-05");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-10 text-center border border-gold/30 shadow-2xl"
      >
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-white mb-3">VIP Booking Confirmed</h3>
        <p className="text-alabaster/60 text-sm leading-relaxed mb-6">
          Thank you, <strong className="text-white">{name}</strong>. Your private viewing has been reserved at our{" "}
          <strong className="text-white">
            {locations.find((l) => l.id === selectedLoc)?.name}
          </strong>{" "}
          on <strong className="text-white">{date}</strong> during the <strong className="text-white">{selectedSlot}</strong> window.
        </p>
        <div className="bg-gold/5 border border-gold/15 rounded-2xl p-6 text-left mb-8">
          <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            VIP Reservation Details
          </h4>
          <ul className="space-y-2 text-xs text-alabaster/75 leading-relaxed">
            <li>
              <strong>Location:</strong> {locations.find((l) => l.id === selectedLoc)?.address}
            </li>
            <li>
              <strong>Service:</strong> {consultationTypes.find((t) => t.id === selectedType)?.name}
            </li>
            <li>
              <strong>Host contact:</strong> sf.vrushabhm@gmail.com (+91 8007539002)
            </li>
          </ul>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all duration-300"
        >
          Book Another Session
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border border-gold/15 shadow-2xl">
      <div className="p-8 sm:p-10">
        <div className="mb-8 border-b border-gold/10 pb-6">
          <h2 className="text-3xl font-serif font-bold text-alabaster mb-2">Book Your VIP Experience</h2>
          <p className="text-alabaster/55 text-sm">
            Reserve a private concierge guided tour at our flagship experience center and testing labs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Location selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gold mb-3 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              1. Select Showroom Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    selectedLoc === loc.id
                      ? "border-gold bg-gold/10 text-white shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                      : "border-alabaster/10 bg-black/30 text-alabaster/60 hover:border-gold/30 hover:text-white"
                  }`}
                >
                  <strong className="text-sm block">{loc.name}</strong>
                  <span className="text-[11px] opacity-75 mt-2 block leading-relaxed">{loc.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Consultation Service */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gold mb-3 block flex items-center gap-2">
              <Award className="w-4 h-4" />
              2. Select Consultation Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {consultationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    selectedType === type.id
                      ? "border-gold bg-gold/10 text-white shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                      : "border-alabaster/10 bg-black/30 text-alabaster/60 hover:border-gold/30 hover:text-white"
                  }`}
                >
                  <strong className="text-sm block">{type.name}</strong>
                  <span className="text-[11px] opacity-75 mt-2 block leading-relaxed">{type.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Date & Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gold mb-3 block flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                3. Choose Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#121214] border border-alabaster/15 text-alabaster px-4 py-3 rounded-lg focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gold mb-3 block flex items-center gap-2">
                <Clock className="w-4 h-4" />
                4. Choose Available Time Slot
              </label>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`cursor-pointer p-3 text-center rounded-lg border text-xs transition-colors duration-300 ${
                      selectedSlot === slot
                        ? "border-gold bg-gold/10 text-white"
                        : "border-alabaster/10 bg-black/30 text-alabaster/60 hover:border-gold/30 hover:text-white"
                    }`}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Contact details */}
          <div className="border-t border-gold/10 pt-6">
            <label className="text-xs font-bold uppercase tracking-wider text-gold mb-4 block">
              5. Enter Guest Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121214] border border-alabaster/15 text-alabaster px-4 py-3 rounded-lg focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121214] border border-alabaster/15 text-alabaster px-4 py-3 rounded-lg focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone (e.g. +254 700...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#121214] border border-alabaster/15 text-alabaster px-4 py-3 rounded-lg focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-obsidian font-bold text-xs uppercase tracking-widest px-10 py-4.5 rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(197,168,128,0.3)]"
            >
              Confirm VIP Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
