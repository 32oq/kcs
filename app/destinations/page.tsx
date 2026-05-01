"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Route, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyMode from "@/components/journey/JourneyMode";
import BookingModal from "@/components/BookingModal";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { destinations } from "@/lib/destinations";
import { destinationToJourney } from "@/lib/journey";
import { packages } from "@/lib/packages";
import type { Destination } from "@/lib/destinations";

type Region = "All" | "Kashmir" | "Ladakh";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function DestCard({ dest, onExplore }: { dest: Destination; onExplore: (d: Destination) => void }) {
  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-2xl group cursor-pointer"
      style={{ border: "1px solid rgba(14,165,233,0.1)" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent" />

        {/* Region badge */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm"
          style={{
            background: dest.region === "Ladakh" ? "rgba(139,92,246,0.25)" : "rgba(14,165,233,0.2)",
            border:     dest.region === "Ladakh" ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(14,165,233,0.35)",
            color:      dest.region === "Ladakh" ? "#c4b5fd" : "#7dd3fc",
          }}
        >
          {dest.region}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <MapPin size={10} className="text-primary-light shrink-0" />
          <span className="text-primary-light/70 text-[10px] font-mono uppercase tracking-widest truncate">
            {dest.title}
          </span>
        </div>
        <h3 className="font-playfair text-lg font-bold text-white mb-2 leading-snug group-hover:text-primary-light transition-colors duration-300">
          {dest.name}
        </h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {dest.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 rounded-full text-[10px] text-white/50 border border-white/8 bg-white/4"
            >
              {h}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onExplore(dest)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-white transition-all duration-300"
          style={{
            background:     "rgba(14,165,233,0.15)",
            border:         "1px solid rgba(14,165,233,0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Route size={11} />
          Explore Journey
        </motion.button>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(14,165,233,0.4)" }}
      />
    </motion.div>
  );
}

function DestinationsContent() {
  const searchParams = useSearchParams();
  const regionParam  = searchParams.get("region");

  const [region, setRegion]         = useState<Region>(
    regionParam === "Kashmir" ? "Kashmir" : regionParam === "Ladakh" ? "Ladakh" : "All"
  );
  const [journeyData, setJourneyData] = useState<ReturnType<typeof destinationToJourney> | null>(null);
  const [selected, setSelected]     = useState<(typeof packages)[0] | null>(null);

  useEffect(() => {
    if (regionParam === "Kashmir" || regionParam === "Ladakh") setRegion(regionParam);
    else setRegion("All");
  }, [regionParam]);

  const filtered = region === "All" ? destinations : destinations.filter((d) => d.region === region);

  const kashmirCount = destinations.filter((d) => d.region === "Kashmir").length;
  const ladakhCount  = destinations.filter((d) => d.region === "Ladakh").length;

  const handleExplore = (dest: Destination) => setJourneyData(destinationToJourney(dest));

  return (
    <>
      <ScrollProgress />

      <div className="relative z-2 bg-animated">
        <Navbar />

        {/* ── Hero ── */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src="/images/kashmir-dal-lake-bg.jpg"
            alt="Kashmir"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-dark/60 via-dark/40 to-dark" />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-3 drop-shadow-lg">
              Explore Destinations
            </h1>
            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-white/80">
              The <span className="text-primary font-bold">Gems</span> of Kashmir &amp; Ladakh
            </p>
          </motion.div>
        </div>

        {/* ── Filters ── */}
        <div className="sticky top-0 z-20 py-4" style={{ background: "var(--bg)", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Region tabs */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-white/40 text-xs font-mono uppercase tracking-wider">
                <Filter size={12} />
                Region:
              </span>
              <div className="flex gap-2">
                {(["All", "Kashmir", "Ladakh"] as Region[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      background: region === r ? "#ea580c" : "transparent",
                      border:     region === r ? "1px solid transparent" : "1px solid rgba(255,255,255,0.18)",
                      color:      region === r ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {r}
                    {r !== "All" && (
                      <span className="ml-1.5 text-[10px] opacity-70">
                        ({r === "Kashmir" ? kashmirCount : ladakhCount})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Showing <span className="text-primary-light font-bold">{filtered.length}</span> destinations
            </p>
          </div>
        </div>

        {/* ── Grid ── */}
        <section className="py-12" style={{ background: "var(--bg)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={region}
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              >
                {filtered.map((dest) => (
                  <DestCard key={dest.id} dest={dest} onExplore={handleExplore} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </div>

      <AnimatePresence>
        {journeyData && (
          <JourneyMode
            journey={journeyData}
            onClose={() => setJourneyData(null)}
            onBook={() => {
              setJourneyData(null);
              setSelected(packages[0]);
            }}
          />
        )}
      </AnimatePresence>

      {selected && <BookingModal pkg={selected} onClose={() => setSelected(null)} />}

      <WhatsAppFloat />
    </>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <DestinationsContent />
    </Suspense>
  );
}
