"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { destinations } from "@/lib/destinations";
import type { Destination } from "@/lib/destinations";

function DestCard({
  dest,
  className = "",
  featured = false,
  delay = 0,
}: {
  dest: Destination;
  className?: string;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer select-none ${className}`}
      style={{ border: "1px solid rgba(14,165,233,0.1)" }}
      whileHover={{ scale: 1.012, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
    >
      {/* Background image */}
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent" />

      {/* Hover shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.1) 0%, transparent 65%)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-5 lg:p-6">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} className="text-primary-light shrink-0" />
          <span className="text-primary-light/80 text-xs font-mono uppercase tracking-widest">Kashmir</span>
        </div>

        <h3
          className={`font-playfair font-bold text-white leading-tight mb-1 ${
            featured ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
          }`}
        >
          {dest.name}
        </h3>
        <p className="text-white/40 text-xs italic mb-3">{dest.title}</p>

        {featured && (
          <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {dest.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          {dest.highlights.slice(0, featured ? 4 : 2).map((h) => (
            <span
              key={h}
              className="px-2.5 py-0.5 rounded-full text-xs text-primary-light border border-primary/25 bg-primary/10 backdrop-blur-sm"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="self-start flex items-center gap-1.5 text-sm font-semibold text-white/60 group-hover:text-white transition-colors duration-300">
          Explore
          <ArrowRight size={13} className="text-primary-light" />
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedDestinations() {
  const [srinagar, gulmarg, pahalgam, sonamarg, doodhpathri, yusmarg] = destinations;

  return (
    <section id="destinations" className="py-24 lg:py-32" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" />
            <Sparkles size={13} className="text-primary" />
            <span className="text-primary text-xs font-mono uppercase tracking-widest">Where to Go</span>
            <Sparkles size={13} className="text-primary" />
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-gradient mb-5">
            Featured Destinations
          </h2>
          <p
            className="max-w-xl mx-auto text-sm lg:text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            From Dal Lake's shimmering waters to snow-draped Gulmarg peaks — every corner of Kashmir tells a story worth living.
          </p>
        </motion.div>

        {/* Editorial grid */}
        {/* Row 1: large Srinagar (2/3) + stacked Gulmarg & Pahalgam (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 h-80 md:h-120">
            <DestCard dest={srinagar} className="h-full" featured delay={0} />
          </div>
          <div className="flex flex-col gap-4 md:h-120">
            <DestCard dest={gulmarg} className="h-48 md:flex-1" delay={0.1} />
            <DestCard dest={pahalgam} className="h-48 md:flex-1" delay={0.2} />
          </div>
        </div>

        {/* Row 2: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DestCard dest={sonamarg} className="h-60" delay={0.15} />
          <DestCard dest={doodhpathri} className="h-60" delay={0.25} />
          <DestCard dest={yusmarg} className="h-60" delay={0.35} />
        </div>

      </div>
    </section>
  );
}
