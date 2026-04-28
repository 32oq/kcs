"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { MapPin, Clock, Star, ArrowRight, Hotel, Car, Utensils } from "lucide-react";
import type { Package } from "@/lib/packages";
import { formatPrice } from "@/lib/packages";

const inclusionIcons: Record<string, React.ReactNode> = {
  Hotel:     <Hotel size={11} />,
  Houseboat: <Hotel size={11} />,
  Resort:    <Hotel size={11} />,
  Cab:       <Car size={11} />,
  Meals:     <Utensils size={11} />,
  Camping:   <MapPin size={11} />,
  Guide:     <MapPin size={11} />,
  Shikara:   <MapPin size={11} />,
  Spa:       <Star size={11} />,
  Skiing:    <Star size={11} />,
  Activities:<Star size={11} />,
};

const categoryColors: Record<string, string> = {
  Honeymoon:   "bg-pink-500/20    text-pink-300    border-pink-400/30",
  Adventure:   "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Photography: "bg-violet-500/20  text-violet-300  border-violet-400/30",
  Family:      "bg-sky-500/20     text-sky-300     border-sky-400/30",
  Winter:      "bg-blue-500/20    text-blue-300    border-blue-400/30",
  Luxury:      "bg-amber-500/20   text-amber-300   border-amber-400/30",
  Budget:      "bg-lime-500/20    text-lime-300    border-lime-400/30",
  Premium:     "bg-amber-500/20   text-amber-300   border-amber-400/30",
  Extended:    "bg-teal-500/20    text-teal-300    border-teal-400/30",
};

const badgeColors: Record<string, string> = {
  "Top Rated":     "bg-amber-400/15  text-amber-300     border-amber-400/30",
  "Best Seller":   "bg-primary/15    text-primary-light border-primary/30",
  "Luxury Pick":   "bg-violet-400/15 text-violet-300    border-violet-400/30",
  "Family Special":"bg-sky-400/15    text-sky-300       border-sky-400/30",
  "Budget Pick":   "bg-lime-400/15   text-lime-300      border-lime-400/30",
  "Popular":       "bg-orange-400/15 text-orange-300    border-orange-400/30",
  "Luxury":        "bg-amber-400/15  text-amber-300     border-amber-400/30",
  "Extended Trip": "bg-teal-400/15   text-teal-300      border-teal-400/30",
};

interface Props {
  pkg: Package;
  onBook: (pkg: Package) => void;
}

export default function PackageCard({ pkg, onBook }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* 3-D tilt via Framer Motion */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 140, damping: 22 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springCfg);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        border: "1px solid rgba(14,165,233,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-dark-card rounded-2xl overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-card via-dark-card/20 to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${categoryColors[pkg.category] ?? ""}`}>
          {pkg.category}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-full text-[11px] font-bold">
          <Star size={9} fill="#fbbf24" className="text-yellow-400" />
          <span className="text-white">{pkg.rating}</span>
        </div>

        {/* Duration pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-white text-xs font-semibold">
          <Clock size={10} />
          {pkg.nights}N / {pkg.days}D
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-primary-light text-xs mb-2">
          <MapPin size={11} />
          <span className="truncate">{pkg.locations.join(" · ")}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-primary-light transition-colors duration-300 leading-snug">
          {pkg.title}
        </h3>

        {/* Highlight tag */}
        <div className="text-xs text-white/40 mb-3 flex items-center gap-1">
          <Star size={9} className="text-amber-400" fill="#fbbf24" />
          {pkg.highlight}
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {pkg.description}
        </p>

        {/* Badge + inclusions */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.badge && (
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm ${badgeColors[pkg.badge] ?? ""}`}>
              <Star size={8} fill="currentColor" />
              {pkg.badge}
            </span>
          )}
          {pkg.inclusions.slice(0, 3).map((inc) => (
            <span key={inc} className="flex items-center gap-1 text-white/50 text-[11px] bg-white/5 px-2 py-1 rounded-full border border-white/8">
              {inclusionIcons[inc] ?? null}
              {inc}
            </span>
          ))}
          {pkg.inclusions.length > 3 && (
            <span className="text-white/30 text-[11px] px-2 py-1">+{pkg.inclusions.length - 3}</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div className="text-white/35 text-[10px] uppercase tracking-wider mb-0.5">Starting from</div>
            <div className="flex items-baseline gap-2">
              <div className="font-serif text-xl font-black text-primary-light">{formatPrice(pkg.price)}</div>
              {pkg.original_price && (
                <span className="text-white/30 text-xs line-through">{formatPrice(pkg.original_price)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/35 text-[10px]">per person</span>
              {pkg.original_price && (
                <span className="text-emerald-400 text-[10px] font-bold">
                  {Math.round((1 - pkg.price / pkg.original_price) * 100)}% OFF
                </span>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(pkg)}
            className="group/btn flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 shadow-lg shadow-primary/30"
          >
            Book Now
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </motion.button>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(14,165,233,0.45), 0 0 30px rgba(14,165,233,0.12)" }}
      />
    </motion.div>
  );
}
