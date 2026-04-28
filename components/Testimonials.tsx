"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    role: "Honeymooners",
    location: "Mumbai, Maharashtra",
    text: "Kashmir Cascade made our honeymoon absolutely magical. The houseboat experience on Dal Lake was beyond our dreams — every detail was perfectly planned, from the shikara rides at dusk to the snow-covered Gulmarg mornings.",
    package: "Romantic Kashmir Honeymoon",
    rating: 5,
    avatar: "PS",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 2,
    name: "Aditya Patel",
    role: "Adventure Traveler",
    location: "Ahmedabad, Gujarat",
    text: "The Great Lakes Trek was the most breathtaking experience of my life. Seven pristine alpine lakes, expert guides, premium camping — and landscapes that make you believe you're in another world entirely.",
    package: "Kashmir Great Lakes Trek",
    rating: 5,
    avatar: "AP",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    name: "Sneha Krishnan",
    role: "Landscape Photographer",
    location: "Bangalore, Karnataka",
    text: "As a professional photographer, the expedition package was tailor-made for me. Access to golden-hour locations I'd never have found alone, local knowledge, and Dal Lake at sunrise — career-defining shots.",
    package: "Kashmir Photography Expedition",
    rating: 5,
    avatar: "SK",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    name: "The Verma Family",
    role: "Family of 5",
    location: "Delhi, NCR",
    text: "We travelled with three kids and the entire trip was seamless. Kashmir Cascade handled everything — hotels, transfers, activities. The children still talk about the pony ride through Pahalgam meadows.",
    package: "Kashmir Family Adventure",
    rating: 5,
    avatar: "VF",
    color: "from-sky-500 to-blue-600",
  },
];

const swipeVariants = {
  enter: (dir: number) => ({ x: dir > 0 ?  260 : -260, opacity: 0 }),
  center:               ({               x: 0,           opacity: 1 }),
  exit:  (dir: number) => ({ x: dir > 0 ? -260 :  260,  opacity: 0 }),
};

export default function Testimonials() {
  const [idx, setIdx]     = useState(0);
  const [dir, setDir]     = useState(1);
  const [auto, setAuto]   = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => { setDir(1); setIdx((i) => (i + 1) % testimonials.length); }, 5500);
    return () => clearInterval(t);
  }, [auto]);

  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + testimonials.length) % testimonials.length);
    setAuto(false);
    setTimeout(() => setAuto(true), 12000);
  };

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-primary-light text-xs font-bold uppercase tracking-[0.22em] mb-4">
            <Star size={13} fill="currentColor" />
            <span>Testimonials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
            What Our Travelers Say
          </h2>
          <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: "var(--text-muted)" }}>
            Stories from 10,000+ explorers who trusted us with their Kashmir journey.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass-dark rounded-3xl p-8 md:p-12"
              style={{ border: "1px solid rgba(14,165,233,0.15)" }}
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote size={36} className="text-primary/40" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" className="text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl leading-relaxed mb-8 font-light" style={{ color: "var(--text)" }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {t.role} · {t.location}
                    </div>
                  </div>
                </div>
                <div className="glass px-3 py-1.5 rounded-full text-xs font-medium text-primary-light">
                  {t.package}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow controls */}
          <button
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 hidden md:flex w-10 h-10 glass rounded-full items-center justify-center text-white hover:bg-primary/20 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 hidden md:flex w-10 h-10 glass rounded-full items-center justify-center text-white hover:bg-primary/20 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); setAuto(false); setTimeout(() => setAuto(true), 12000); }}
              className={`rounded-full transition-all duration-400 ${i === idx ? "w-7 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
