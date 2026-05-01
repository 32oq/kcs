"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MapPin, Star, Check, Phone, Mail,
  Camera, Music, UtensilsCrossed, Car, Bed,
  CalendarHeart, Sparkles, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// ── Data ─────────────────────────────────────────────────────────────────────

const venues = [
  {
    name: "The LaLiT Grand Palace",
    badge: "Heritage Resort",
    image: "/images/lalit-grand-palace.webp",
    tags: ["Dal Lake", "Palace"],
    desc: "A 19th-century palace overlooking Dal Lake, offering spectacular views and opulent banquet halls for royal ceremonies.",
  },
  {
    name: "The Khyber Himalayan Resort",
    badge: "Mountain Resort",
    image: "/images/khyber-himalayan-resort.webp",
    tags: ["Gulmarg", "Snow Venue"],
    desc: "A breathtaking snow-draped resort in Gulmarg offering intimate mountain weddings and world-class Kashmiri hospitality.",
  },
  {
    name: "Royal Houseboat Wedding",
    badge: "Unique Venue",
    image: "/images/luxury-houseboat.jpg",
    tags: ["Nigeen Lake", "Houseboat"],
    desc: "Exchange vows on a beautifully decorated houseboat floating on the tranquil waters of Nigeen Lake as the sun sets.",
  },
  {
    name: "The Khyber — Snow Wedding",
    badge: "Mountain Resort",
    image: "/images/khyber-himalayan-resort.webp",
    tags: ["Gulmarg", "Snow Venue"],
    desc: "A once-in-a-lifetime snow wedding surrounded by pristine Himalayan peaks and winter pine forests at Gulmarg.",
  },
  {
    name: "LaLiT Grand — Palace Ceremony",
    badge: "Heritage Resort",
    image: "/images/lalit-grand-palace.webp",
    tags: ["Srinagar", "Lakeside"],
    desc: "Host your reception in the opulent banquet halls or on the sprawling lawns with panoramic Dal Lake vistas.",
  },
  {
    name: "Hotel & Restaurant Nedous",
    badge: "Classic Hotel",
    image: "/images/nedous-hotel.jpeg",
    tags: ["Srinagar", "Heritage Hotel"],
    desc: "Kashmir's most historic property dating to 1880, offering classic colonial elegance for an unforgettable intimate wedding.",
  },
];

const services = [
  { icon: <CalendarHeart size={22} />, title: "Complete Wedding Planning", desc: "End-to-end coordination from venue to vendors, creating your perfect day across Kashmir and Ladakh locations." },
  { icon: <Sparkles size={22} />,      title: "Kashmiri Themed Décor",    desc: "Authentic Kashmiri décor — embroidered fabrics, Chinar leaves, lotus flowers and hand-carved wood panels." },
  { icon: <UtensilsCrossed size={22} />, title: "Royal Wazwan Feast",     desc: "Traditional 36-course Kashmiri banquet featuring Rogan Josh, Yakhni, and Gushtaba served on traditional copper dishes." },
  { icon: <Music size={22} />,          title: "Cultural Entertainment",  desc: "Your venue comes alive with Kashmiri folk artists, Sufiana Kalam singers, and traditional Rouf dance performers." },
  { icon: <Camera size={22} />,         title: "Destination Photography",  desc: "Cinematic wedding films and photographs across Pahalgam, Gulmarg, Dal Lake and the majestic Himalayan vistas." },
  { icon: <Car size={22} />,            title: "Luxury Transport",         desc: "Decorated vintage cars, shikaras, tonga rides and helicopter transfers for a truly memorable entrance." },
  { icon: <Bed size={22} />,            title: "Guest Accommodation",      desc: "Curated hotel blocks, luxury houseboats and premium camps for all your wedding guests at the best rates." },
  { icon: <Heart size={22} />,          title: "Honeymoon Planning",       desc: "Seamless transition to a bespoke honeymoon itinerary across Kashmir, Ladakh or any global destination." },
];

const packages = [
  {
    name: "Intimate Kashmir Wedding",
    nights: "2 Nights",
    days: "3 Days",
    // price: "₹1,20,000",
    highlight: false,
    inclusions: ["Houseboat Venue", "Venue Décor", "Priest & Rituals", "Shikara Entry", "Wazwan Dinner"],
  },
  {
    name: "Royal Kashmir Celebration",
    nights: "4 Nights",
    days: "5 Days",
    // price: "₹2,80,000",
    highlight: true,
    badge: "Most Popular",
    inclusions: ["Venue Selection", "Complete Planning", "Luxury Décor", "Catering", "Entertainment", "Photography"],
  },
  {
    name: "Grand Destination Wedding",
    nights: "5 Nights",
    days: "7 Days",
    // price: "₹5,50,000",
    highlight: false,
    inclusions: ["Premium Venue", "Celebrity Planner", "Luxury Décor", "Multi-location", "Full Crew Management", "Honeymoon"],
  },
];

const whyCards = [
  {
    icon: "🏰",
    title: "Magical Venues",
    desc: "From palace gardens to Himalayan resorts, Kashmir's wedding venues are unlike anywhere else in the world.",
  },
  {
    icon: "🍛",
    title: "Royal Wazwan Feast",
    desc: "Treat your guests to the legendary 36-course Kashmiri Wazwan — a feast that makes every wedding unforgettable.",
  },
  {
    icon: "📸",
    title: "Picture-Perfect Backdrops",
    desc: "Snow peaks, lotus lakes, Mughal gardens and apple orchards create breathtaking photographs for a lifetime.",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <span className="w-8 h-px bg-amber-500/50" />
      <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold uppercase tracking-widest">
        <Heart size={11} fill="currentColor" />
        <span>{children}</span>
      </div>
      <span className="w-8 h-px bg-amber-500/50" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919906503339";

function buildWhatsAppURL(form: { coupleName: string; date: string; guests: string; phone: string }) {
  const msg = [
    "Hello Kashmir Cascade! 👋",
    "",
    "I'd like to enquire about a *Destination Wedding in Kashmir*.",
    "",
    `👫 *Couple Names:* ${form.coupleName || "—"}`,
    `📅 *Wedding Date:* ${form.date || "—"}`,
    `👥 *Guest Count:* ${form.guests || "—"}`,
    `📞 *My Phone/WhatsApp:* ${form.phone || "—"}`,
    "",
    "Please get back to me with details. Thank you!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function WeddingsPage() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  const [form, setForm] = useState({ coupleName: "", date: "", guests: "", phone: "" });

  function openEnquire(venueName?: string) {
    setSelectedVenue(venueName ?? "");
    setEnquireOpen(true);
  }

  function handleSubmit() {
    window.open(buildWhatsAppURL(form), "_blank", "noopener,noreferrer");
    setEnquireOpen(false);
    setForm({ coupleName: "", date: "", guests: "", phone: "" });
  }

  return (
    <>
      <ScrollProgress />

      <div className="relative z-2 bg-animated">
        <Navbar />

        {/* ── Hero ── */}
        <div className="relative h-80 md:h-[520px] overflow-hidden">
          <img
            src="/images/pahalgam.jpg"
            alt="Destination Weddings in Kashmir"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.7) 60%, rgba(2,6,23,1) 100%)" }} />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex flex-col items-start justify-end pb-16 px-8 md:px-16 max-w-4xl"
          >
            <p className="text-amber-400 text-xs font-mono uppercase tracking-[0.3em] mb-3">
              The <span className="font-bold">Experience</span> Art of Travel
            </p>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white leading-tight mb-4">
              Destination<br />Weddings
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              Say "I Do" with the Himalayas as your witness and Dal Lake as your altar.
            </p>
          </motion.div>
        </div>

        {/* ── Say I Do in Paradise ── */}
        <section className="py-20" style={{ background: "var(--bg)" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SectionLabel>Royal Celebrations</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-5">
              Say &ldquo;I Do&rdquo; in Paradise
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12">
              Imagine exchanging vows on a decorated houseboat floating on Dal Lake, with the majestic Himalayas as your witness. Or dancing under the stars in a Mughal garden where emperors once celebrated love. Kashmir offers the most romantic and unique wedding destinations in India — a place where every moment becomes a fairy tale.
            </p>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14 text-left">
              {[
                { quote: "The houseboat wedding was a dream come true. Every single detail was perfect!", name: "Rahul & Divya", loc: "Mumbai" },
                { quote: "No grand setting could top the Himalayan backdrop. Truly 'Top-notch Planning'.", name: "Amit & Sneha", loc: "Delhi" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ background: "#ea580c" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm italic leading-relaxed mb-2">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-white font-bold text-xs">{t.name}</p>
                    <p className="text-white/35 text-[11px]">{t.loc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Kashmir */}
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-2">
              Why Kashmir for Your Wedding?
            </h3>
            <p className="text-white/40 text-sm mb-10">
              Discover what makes Kashmir India's most sought-after destination wedding location.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {whyCards.map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="text-4xl mb-4">{c.icon}</div>
                  <h4 className="font-bold text-white mb-2">{c.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Venues ── */}
        <section className="py-20" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <SectionLabel>Premium Stays</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3">
                Luxury Wedding Venues &amp; Hotels
              </h2>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                Handpicked venues from opulent palace hotels to floating houseboat suites — every setting tells a love story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                  className="rounded-2xl overflow-hidden group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-dark/70 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-sm" style={{ background: "#ea580c" }}>
                      {v.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {v.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {v.tags.map((t) => (
                        <span key={t} className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
                          <MapPin size={9} />
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2">{v.desc}</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openEnquire(v.name)}
                      className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      Enquire Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="py-20" style={{ background: "#020617" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3">
                Our Wedding Services
              </h2>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                From planning to goodbye hugs — we handle every beautiful detail so you can be fully present on your big day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white"
                    style={{ background: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.3)" }}
                  >
                    <span className="text-amber-500">{s.icon}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{s.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="py-20" style={{ background: "var(--bg)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-3">
                Wedding Packages
              </h2>
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                Custom packages built for your vision, your budget and your love story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="relative rounded-2xl p-7 flex flex-col"
                  style={{
                    background: pkg.highlight ? "linear-gradient(135deg, rgba(234,88,12,0.18) 0%, rgba(251,146,60,0.08) 100%)" : "rgba(255,255,255,0.03)",
                    border:     pkg.highlight ? "1px solid rgba(234,88,12,0.45)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow:  pkg.highlight ? "0 0 40px rgba(234,88,12,0.12)" : "none",
                  }}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#ea580c" }}>
                      {pkg.badge}
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="text-amber-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                      {pkg.nights} · {pkg.days}
                    </p>
                    <h3 className="font-playfair text-xl font-bold text-white">{pkg.name}</h3>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-center gap-2.5 text-sm text-white/70">
                        <Check size={13} className="text-amber-400 shrink-0" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  {/* <div className="mb-5">
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Starting from</p>
                    <p className="font-playfair text-2xl font-bold text-white">{pkg.price}</p>
                    <p className="text-white/30 text-[10px]">per couple</p>
                  </div> */}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openEnquire(pkg.name)}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      background: pkg.highlight ? "#ea580c" : "transparent",
                      border:     pkg.highlight ? "1px solid transparent" : "1px solid rgba(255,255,255,0.2)",
                      color:      "#fff",
                    }}
                  >
                    Enquire Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dream CTA ── */}
        <section
          className="py-20"
          style={{ background: "rgba(234,88,12,0.05)", borderTop: "1px solid rgba(234,88,12,0.12)", borderBottom: "1px solid rgba(234,88,12,0.12)" }}
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <Heart size={32} className="text-amber-500 mx-auto mb-5" fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
              Let&apos;s Plan Your Dream Wedding
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Our wedding specialists are ready to turn your vision into reality. Start with a free consultation and let&apos;s create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openEnquire()}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold shadow-lg"
                style={{ background: "#ea580c", boxShadow: "0 8px 24px rgba(234,88,12,0.35)" }}
              >
                <Heart size={14} fill="currentColor" />
                Plan My Wedding
              </motion.button>
              <motion.a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold border border-white/20 hover:border-white/40 transition-colors"
              >
                <Phone size={14} />
                Talk to Experts
              </motion.a>
            </div>
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
              <Link href="/packages">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold"
                  style={{ background: "#0ea5e9", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}
                >
                  Explore Our Packages
                  <ChevronRight size={14} />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold border border-white/20 hover:border-white/40 transition-colors"
                >
                  <Mail size={14} />
                  Contact Our Experts
                </motion.span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* ── Enquire modal ── */}
      <AnimatePresence>
        {enquireOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setEnquireOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full max-w-md rounded-2xl p-8"
              style={{ background: "#0a1628", border: "1px solid rgba(234,88,12,0.35)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <Heart size={28} className="text-amber-500 mx-auto mb-3" fill="currentColor" />
                <h3 className="font-playfair text-2xl font-bold text-white">Plan Your Wedding</h3>
                {selectedVenue ? (
                  <p className="text-amber-400/80 text-xs font-mono mt-1 uppercase tracking-widest">{selectedVenue}</p>
                ) : null}
                <p className="text-white/40 text-sm mt-1">Fill in your details — we&apos;ll open WhatsApp with your enquiry ready to send.</p>
              </div>

              <div className="space-y-4">
                {/* Couple Names */}
                <div>
                  <label className="block text-white/45 text-xs uppercase tracking-wider mb-1.5">Couple Names</label>
                  <input
                    value={form.coupleName}
                    onChange={(e) => setForm((f) => ({ ...f, coupleName: e.target.value }))}
                    placeholder="e.g. Rahul &amp; Priya"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.2)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.2)")}
                  />
                </div>

                {/* Wedding Date */}
                <div>
                  <label className="block text-white/45 text-xs uppercase tracking-wider mb-1.5">Wedding Date</label>
                  <input
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    placeholder="Preferred date or month"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.2)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.2)")}
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-white/45 text-xs uppercase tracking-wider mb-1.5">Guest Count</label>
                  <input
                    value={form.guests}
                    onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                    placeholder="Approx. number of guests"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.2)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.2)")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/45 text-xs uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.2)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(234,88,12,0.2)")}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-bold mt-2 flex items-center justify-center gap-2"
                  style={{ background: "#25D366", boxShadow: "0 8px 20px rgba(37,211,102,0.3)" }}
                >
                  {/* WhatsApp icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </motion.button>

                <button
                  onClick={() => setEnquireOpen(false)}
                  className="w-full py-2 text-white/35 hover:text-white/70 text-sm transition-colors"
                >
                  Cancel
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
