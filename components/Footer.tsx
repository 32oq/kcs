"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";

const explore = [
  { label: "About Us",      href: "/#about" },
  { label: "Destinations",  href: "/destinations" },
  { label: "Packages",      href: "/packages" },
  { label: "Weddings",      href: "/weddings" },
  { label: "Blog",          href: "/#blog" },
  { label: "Contact Us",    href: "/contact" },
];

const support = [
  { label: "Terms & Conditions",  href: "#" },
  { label: "Privacy Policy",      href: "#" },
  { label: "Cancellation Policy", href: "#" },
  { label: "FAQs",                href: "#" },
  { label: "Sitemap",             href: "#" },
];

const destinations = [
  "Srinagar City", "Gulmarg", "Pahalgam", "Sonamarg", "Mystic Ladakh", "Doodhpathri",
];

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{ background: "#020617", borderTop: "1px solid rgba(14,165,233,0.12)" }}
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-5">
              <img
                src="https://32oq.github.io/kcs/images/logo-white.png"
                alt="Kashmir Cascade"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Your trusted partner for exploring the unseen beauty of Kashmir and Ladakh. Registered with J&K Tourism.
            </p>
            <div className="text-white/30 text-xs mb-5">
              Excursion Agent Reg No: <span className="text-primary-light font-mono">JKEA00005258</span>
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: <MapPin size={13} />,  text: "Lal Chowk, Srinagar, J&K — 190001" },
                { icon: <Phone size={13} />,   text: "+91 XXXXX XXXXX" },
                { icon: <Mail size={13} />,    text: "hello@kashmircascade.com" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 text-white/45 text-xs">
                  <span className="text-primary mt-0.5 shrink-0">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/45 hover:text-primary-light text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary-light" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((d) => (
                <li key={d}>
                  <Link href="/destinations" className="text-white/45 hover:text-primary-light text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary-light" />
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3 mb-8">
              {support.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/45 hover:text-primary-light text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary-light" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Connect</h4>
            <div className="flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.12, y: -2 }}
                className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </motion.a>
              <motion.a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold transition-all"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Kashmir Cascade — The Travel Company. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/30 text-xs">Available 24/7 for your Kashmir journey</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
