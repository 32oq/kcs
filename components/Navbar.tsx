"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Moon, Sun, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/providers";

type DropItem = { label: string; href: string };

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropItem[];
}

const links: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    href: "/destinations",
    dropdown: [
      { label: "All Destinations", href: "/destinations" },
      { label: "Kashmir Valley",   href: "/destinations?region=Kashmir" },
      { label: "Ladakh",           href: "/destinations?region=Ladakh" },
    ],
  },
  {
    label: "Packages",
    href: "/packages",
    dropdown: [
      { label: "All Packages",     href: "/packages" },
      { label: "Kashmir Packages", href: "/packages?region=Kashmir" },
      { label: "Ladakh Packages",  href: "/packages?region=Ladakh" },
    ],
  },
  { label: "Weddings", href: "/weddings" },
  { label: "Contact",  href: "/contact" },
];

function DropdownMenu({ items }: { items: DropItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
      className="absolute top-full left-0 mt-2 min-w-45 rounded-xl overflow-hidden z-50"
      style={{
        background: "rgba(8,16,40,0.97)",
        border: "1px solid rgba(14,165,233,0.18)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      }}
    >
      {items.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-primary/10 transition-colors duration-150"
          style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

export default function Navbar({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop,   setOpenDrop]   = useState<string | null>(null);
  const [mobileExp,  setMobileExp]  = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:          scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter:      scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter:scrolled ? "blur(18px)" : "none",
          borderBottom:        scrolled ? "1px solid rgba(14,165,233,0.12)" : "1px solid transparent",
          boxShadow:           scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.img
              src="/images/logo-white.png"
              alt="Kashmir Cascade"
              whileHover={{ scale: 1.05 }}
              className="h-10 w-auto object-contain drop-shadow-lg"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => l.dropdown && setOpenDrop(l.label)}
                onMouseLeave={() => setOpenDrop(null)}
              >
                <Link
                  href={l.href}
                  className="relative flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 group"
                >
                  {l.label}
                  {l.dropdown && (
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{ transform: openDrop === l.label ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-light group-hover:w-full transition-all duration-300 rounded" />
                </Link>

                <AnimatePresence>
                  {l.dropdown && openDrop === l.label && (
                    <DropdownMenu items={l.dropdown} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
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
                  <div key={l.label}>
                    {l.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileExp((p) => (p === l.label ? null : l.label))}
                          className="w-full flex items-center justify-between py-3 text-sm font-medium text-white/70 hover:text-primary-light transition-colors"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          {l.label}
                          <ChevronDown
                            size={13}
                            className="transition-transform duration-200"
                            style={{ transform: mobileExp === l.label ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExp === l.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {l.dropdown.map((d) => (
                                <Link
                                  key={d.label}
                                  href={d.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block pl-4 py-2.5 text-sm text-white/50 hover:text-primary-light transition-colors"
                                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                                >
                                  {d.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-sm font-medium text-white/70 hover:text-primary-light transition-colors"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        {l.label}
                      </Link>
                    )}
                  </div>
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
