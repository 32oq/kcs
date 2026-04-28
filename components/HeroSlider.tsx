"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://kashmircascade.com/images/Kashmir%20Dal%20Lake%20Background.jpg",
    title: "Heaven on Earth",
    subtitle: "Discover the Timeless Beauty of Kashmir",
    location: "Dal Lake, Srinagar",
    kenburns: "kenburns-1",
  },
  {
    id: 2,
    image:
      "https://source.unsplash.com/1920x1080/?gulmarg,kashmir,snow,mountain,pine",
    title: "Where Snow Meets Sky",
    subtitle: "Asia's Premier Ski Destination & Alpine Meadows",
    location: "Gulmarg, Kashmir",
    kenburns: "kenburns-2",
  },
  {
    id: 3,
    image:
      "https://source.unsplash.com/1920x1080/?pahalgam,kashmir,valley,river,forest",
    title: "Valley of Shepherds",
    subtitle: "Trek Through Pristine Himalayan Wilderness",
    location: "Pahalgam Valley",
    kenburns: "kenburns-3",
  },
  {
    id: 4,
    image:
      "https://source.unsplash.com/1920x1080/?sonmarg,kashmir,glacier,meadow",
    title: "Meadow of Gold",
    subtitle: "Journey to the Majestic Thajiwas Glacier",
    location: "Sonmarg, Kashmir",
    kenburns: "kenburns-4",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Travelers" },
  { value: "50+", label: "Packages" },
  { value: "15+", label: "Years Experience" },
];

export default function HeroSlider({
  onQuoteClick,
}: {
  onQuoteClick?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides with Ken Burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${slide.kenburns}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/35 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Location Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex items-center gap-2 text-gold text-xs sm:text-sm font-semibold mb-5 uppercase tracking-[0.2em]"
            >
              <MapPin size={14} />
              {slide.location}
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-5">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 text-base sm:text-lg md:text-xl mb-9 max-w-lg font-light leading-relaxed">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onQuoteClick}
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1"
              >
                Get a Quote
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 glass text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
              >
                Explore Packages
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-20 right-6 hidden lg:flex gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="text-2xl font-serif font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Slide Indicators — bottom left */}
        <div className="absolute bottom-8 left-6 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 h-2 bg-gold"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 glass rounded-full text-white hover:bg-white/20 transition-all hover:-translate-y-1/2 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 glass rounded-full text-white hover:bg-white/20 transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
