"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Moon, Sun, Menu, X, Phone } from "lucide-react";
import { useTheme } from "@/app/providers";

const links = [
  { label: "Home",         href: "#" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages",     href: "#packages" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(14,165,233,0.12)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.img
              src="https://kashmircascade.com/logo-white.png?v=2"
              alt="Kashmir Cascade"
              whileHover={{ scale: 1.05 }}
              className="h-10 w-auto object-contain drop-shadow-lg"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-light group-hover:w-full transition-all duration-300 rounded" />
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggle}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onQuoteClick}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 shadow-lg shadow-primary/30"
            >
              <Phone size={13} />
              Plan Trip
            </motion.button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/60"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/80"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
              style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(14,165,233,0.1)" }}
            >
              <div className="px-6 py-5 space-y-1">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium text-white/70 hover:text-primary-light transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); onQuoteClick?.(); }}
                  className="w-full mt-4 bg-primary text-white py-3 rounded-full text-sm font-bold hover:bg-primary-dark transition-colors"
                >
                  Plan Your Trip
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
