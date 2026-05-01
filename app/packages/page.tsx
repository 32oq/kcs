"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Star, Clock, Search, SlidersHorizontal, Heart } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { packages, formatPrice } from "@/lib/packages";
import type { Package } from "@/lib/packages";

const CATEGORIES = ["All", "Honeymoon", "Family", "Adventure", "Spiritual", "Winter Special", "Budget", "Photography", "Senior Special"];
const REGIONS    = ["All Regions", "Kashmir", "Ladakh"] as const;

type Region = typeof REGIONS[number];

const BADGE_COLORS: Record<string, string> = {
  "Best Seller":    "#ea580c",
  "Family Pick":    "#16a34a",
  "Spiritual":      "#7c3aed",
  "Adventure":      "#0284c7",
  "Cultural":       "#0284c7",
  "Winter Special": "#0891b2",
  "Budget":         "#ca8a04",
  "Photography":    "#db2777",
  "Senior Special": "#9333ea",
  "Scenic":         "#0ea5e9",
  "Thrill":         "#dc2626",
  "Budget Pick":    "#ca8a04",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function PackageCard({ pkg, onEnquire }: { pkg: Package; onEnquire: (p: Package) => void }) {
  const badgeColor = BADGE_COLORS[pkg.badge ?? ""] ?? "#ea580c";

  return (
    <motion.div
      variants={item}
      className="rounded-2xl overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark/70 to-transparent" />

        {/* Category badge */}
        {pkg.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ background: badgeColor }}
          >
            {pkg.badge}
          </span>
        )}

        {/* Duration badge */}
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <Clock size={9} />
          {pkg.days}D/{pkg.nights}N
        </span>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.45)" }}>
          <Star size={9} fill="currentColor" className="text-amber-400" />
          <span className="text-amber-300">{pkg.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Region tag */}
        <div className="flex items-center gap-1 mb-2">
          <MapPin size={10} className="text-primary shrink-0" />
          <span className="text-primary/80 text-[10px] font-mono uppercase tracking-widest">{pkg.region}</span>
        </div>

        <h3 className="font-playfair text-lg font-bold text-white mb-2 leading-snug group-hover:text-primary-light transition-colors duration-300">
          {pkg.title}
        </h3>
        <p className="text-white/45 text-xs leading-relaxed mb-3 line-clamp-2">
          {pkg.description}
        </p>

        {/* Location tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.locations.slice(0, 3).map((loc) => (
            <span
              key={loc}
              className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] text-white/45 border border-white/8 bg-white/4"
            >
              <MapPin size={8} />
              {loc}
            </span>
          ))}
          {pkg.locations.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] text-primary/60 border border-primary/15 bg-primary/5">
              +{pkg.locations.length - 3} more
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Starting from</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-primary-light font-bold text-base">{formatPrice(pkg.price)}</span>
              {pkg.original_price && (
                <span className="text-white/25 text-xs line-through">{formatPrice(pkg.original_price)}</span>
              )}
            </div>
            <p className="text-white/25 text-[10px]">per person</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onEnquire(pkg)}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
            style={{ background: "#ea580c", boxShadow: "0 4px 14px rgba(234,88,12,0.35)" }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(14,165,233,0.3)" }} />
    </motion.div>
  );
}

const WHATSAPP = "919906503339";

function buildWAMsg(pkg: Package) {
  return encodeURIComponent(
    `Hello Kashmir Cascade! 👋\n\nI'm interested in the *${pkg.title}* package.\n\n📅 *Duration:* ${pkg.days} Days / ${pkg.nights} Nights\n📍 *Locations:* ${pkg.locations.join(", ")}\n💰 *Price:* ${formatPrice(pkg.price)} per person\n\nPlease share more details and availability. Thank you!`
  );
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const regionParam  = searchParams.get("region");

  const [region,   setRegion]   = useState<Region>(
    regionParam === "Kashmir" ? "Kashmir" : regionParam === "Ladakh" ? "Ladakh" : "All Regions"
  );
  const [category, setCategory] = useState("All");
  const [search,   setSearch]   = useState("");
  const [enquire,  setEnquire]  = useState<Package | null>(null);

  useEffect(() => {
    if (regionParam === "Kashmir" || regionParam === "Ladakh") setRegion(regionParam);
    else setRegion("All Regions");
  }, [regionParam]);

  const filtered = packages.filter((p) => {
    if (region !== "All Regions" && p.region !== region) return false;
    if (category !== "All" && p.category !== category) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.locations.some((l) => l.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <>
      <ScrollProgress />

      <div className="relative z-2 bg-animated">
        <Navbar />

        {/* ── Hero ── */}
        <div className="relative h-72 md:h-100 overflow-hidden">
          <img
            src="https://32oq.github.io/kcs/images/khardungla-pass.png"
            alt="Kashmir Packages"
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
              Curated Packages
            </h1>
            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-white/80">
              Handpicked <span className="text-primary font-bold">Itineraries</span> For You
            </p>
          </motion.div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="sticky top-0 z-20 py-4" style={{ background: "var(--bg)", borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
          <div className="max-w-7xl mx-auto px-6">

            {/* Row 1: Region + Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              {/* Region tabs */}
              <div className="flex gap-2">
                {REGIONS.map((r) => (
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
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-52">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search packages..."
                    className="w-full pl-8 pr-4 py-2 rounded-full text-sm text-white placeholder-white/25 outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  />
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white/60 border border-white/12 hover:border-primary/40 hover:text-primary-light transition-colors"
                >
                  <SlidersHorizontal size={12} />
                  Featured Search
                </button>
              </div>
            </div>

            {/* Row 2: Category tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: category === cat ? "rgba(14,165,233,0.2)" : "transparent",
                    border:     category === cat ? "1px solid rgba(14,165,233,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    color:      category === cat ? "#7dd3fc" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Count ── */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Showing <span className="text-primary-light font-bold">{filtered.length}</span> holiday itineraries
          </p>
        </div>

        {/* ── Grid ── */}
        <section className="py-6 pb-16" style={{ background: "var(--bg)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${region}-${category}-${search}`}
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} onEnquire={setEnquire} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/30 text-sm">No packages match your filters.</p>
              </div>
            )}

            {/* ── "Can't Find" CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-14 rounded-2xl px-8 py-10 text-center"
              style={{ background: "rgba(234,88,12,0.06)", border: "1px solid rgba(234,88,12,0.18)" }}
            >
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                Can&apos;t Find What You&apos;re Looking For?
              </h3>
              <p className="text-white/45 text-sm mb-6">
                Let us create a custom itinerary tailored to your preferences, budget, and travel dates.
              </p>
              <motion.a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Kashmir Cascade! I'd like to create a custom Kashmir/Ladakh package. Can you help me?")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm font-bold shadow-lg"
                style={{ background: "#ea580c", boxShadow: "0 8px 24px rgba(234,88,12,0.35)" }}
              >
                Plan Custom Trip
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ── Ready CTA ── */}
        <section className="py-16" style={{ background: "#020617" }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-3">
              Ready to Experience Kashmir?
            </h2>
            <p className="text-white/45 text-sm mb-8">
              Discover the breathtaking beauty of the valley with our curated premium packages, designed to give you memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setRegion("All Regions")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold"
                style={{ background: "#0ea5e9", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}
              >
                Explore Our Packages →
              </motion.button>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold border border-white/20 hover:border-white/40 transition-colors"
                >
                  Contact Our Experts
                </motion.span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* ── Enquire / WhatsApp modal ── */}
      <AnimatePresence>
        {enquire && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setEnquire(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full max-w-sm rounded-2xl overflow-hidden"
              style={{ background: "#0a1628", border: "1px solid rgba(14,165,233,0.25)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Package image */}
              <div className="relative h-44">
                <img src={enquire.image} alt={enquire.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-primary-light text-[10px] font-mono uppercase tracking-widest mb-1">{enquire.region} · {enquire.category}</p>
                  <h3 className="font-playfair text-xl font-bold text-white">{enquire.title}</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Details */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Duration", value: `${enquire.days}D / ${enquire.nights}N` },
                    { label: "Rating",   value: `⭐ ${enquire.rating}` },
                    { label: "Price",    value: formatPrice(enquire.price) },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <p className="text-white/35 text-[10px] uppercase tracking-wider">{label}</p>
                      <p className="text-white font-bold text-xs mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {enquire.inclusions.map((inc) => (
                    <span key={inc} className="px-2 py-0.5 rounded-full text-[10px] text-primary-light border border-primary/20 bg-primary/8">
                      {inc}
                    </span>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href={`https://wa.me/${WHATSAPP}?text=${buildWAMsg(enquire)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-bold mb-3"
                  style={{ background: "#25D366", boxShadow: "0 6px 16px rgba(37,211,102,0.3)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enquire on WhatsApp
                </motion.a>
                <button
                  onClick={() => setEnquire(null)}
                  className="w-full py-2 text-white/35 hover:text-white/70 text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppFloat />
    </>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <PackagesContent />
    </Suspense>
  );
}
