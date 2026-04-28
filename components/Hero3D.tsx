"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, MapPin, Star, Shield, Headphones } from "lucide-react";

/* Dynamic import — Three.js must not run on server */
const Globe = dynamic(() => import("./Globe"), { ssr: false });

const stats = [
  { value: "10K+", label: "Happy Travelers" },
  { value: "98%",  label: "Satisfaction" },
  { value: "50+",  label: "Packages" },
  { value: "15+",  label: "Years" },
];

const trust = [
  { icon: <Star size={14} />,        label: "4.9★ Rated" },
  { icon: <Shield size={14} />,      label: "J&K Tourism Reg." },
  { icon: <Headphones size={14} />,  label: "24/7 Support" },
];

interface Props {
  onQuoteClick: () => void;
}

export default function Hero3D({ onQuoteClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  /* Mouse-parallax values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 28, damping: 28 };
  const bgX = useSpring(useTransform(mouseX, [-1, 1], ["-18px", "18px"]), springCfg);
  const bgY = useSpring(useTransform(mouseY, [-1, 1], ["-10px", "10px"]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX / width  - 0.5) * 2);
    mouseY.set((clientY / height - 0.5) * 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* Stagger variants */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Parallax background ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 scale-[1.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://kashmircascade.com/images/Kashmir%20Dal%20Lake%20Background.jpg')",
          x: bgX,
          y: bgY,
        }}
      />

      {/* ── Gradient overlays ───────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-r from-dark/92 via-dark/70 to-dark/30" />
      <div className="absolute inset-0 bg-linear-to-b from-dark/40 via-transparent to-dark/80" />

      {/* ── Animated background glow ────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-dark blur-[100px]"
        />
      </div>

      {/* ── Content grid ────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">

          {/* ── Left: Text ──────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-primary-light uppercase tracking-[0.18em]">
                <MapPin size={12} />
                Premium Kashmir Experiences
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black text-white leading-[0.92] mb-6"
            >
              Explore{" "}
              <span className="text-gradient">Paradise</span>
              <br />
              on Earth —
              <br />
              <span className="italic font-medium text-white/80">Kashmir</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md mb-8"
            >
              Curated journeys to the heart of the Himalayas. Discover the
              unseen beauty of Dal Lake, Gulmarg, and beyond with J&K's most
              trusted travel partner.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-sm font-bold transition-colors duration-200 shadow-2xl shadow-primary/40 overflow-hidden"
              >
                <span>View Packages</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2 glass border border-primary/30 hover:border-primary/60 text-white px-8 py-4 rounded-full text-sm font-bold transition-all duration-200"
              >
                Plan Your Trip
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={item} className="flex items-center gap-5 mb-10">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-1.5 text-white/50 text-xs">
                  <span className="text-primary-light">{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-serif text-2xl font-black text-white">{s.value}</div>
                  <div className="text-white/40 text-[11px] uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Globe ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow behind globe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-[420px] h-[420px] rounded-full bg-primary blur-[80px]"
              />
            </div>

            {/* Globe canvas */}
            <motion.div
              className="float-anim relative z-10 w-[500px] h-[500px] xl:w-[560px] xl:h-[560px]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Globe />

              {/* Location tooltip */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-xs text-primary-light font-semibold flex items-center gap-1.5 pointer-events-none whitespace-nowrap"
                  >
                    <MapPin size={11} />
                    Kashmir, India · 34°N 74°E
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Floating info cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute top-12 -left-4 glass px-4 py-3 rounded-2xl text-xs space-y-1"
            >
              <div className="text-white/40 uppercase tracking-wider text-[10px]">Current Season</div>
              <div className="text-white font-semibold">Spring · Tulip Bloom</div>
              <div className="flex gap-1 mt-1">
                {["🌷","🌸","🌿"].map((e, i) => <span key={i}>{e}</span>)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="absolute bottom-20 -right-4 glass px-4 py-3 rounded-2xl text-xs space-y-1"
            >
              <div className="text-white/40 uppercase tracking-wider text-[10px]">Best Time</div>
              <div className="text-white font-semibold">Mar — Oct</div>
              <div className="text-primary-light text-[10px]">✈ Flights from ₹3,500</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary-light/60" />
        </motion.div>
        <span className="text-white/25 text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
