"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const contactDetails = [
  {
    icon: <MapPin size={18} />,
    label: "Our Office",
    value: "Lal Chowk, Srinagar, J&K — 190001",
  },
  {
    icon: <Phone size={18} />,
    label: "Call / WhatsApp",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "hello@kashmircascade.com",
    href: "mailto:hello@kashmircascade.com",
  },
  {
    icon: <Clock size={18} />,
    label: "Working Hours",
    value: "Mon – Sat · 9:00 AM – 7:00 PM IST",
  },
];

const tripTypes = ["Honeymoon", "Family", "Adventure", "Budget", "Luxury", "Custom"];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", tripType: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hello Kashmir Cascade! 👋",
      "",
      "I'd like to enquire about a trip to Kashmir.",
      "",
      `👤 *Name:* ${form.name || "—"}`,
      `📧 *Email:* ${form.email || "—"}`,
      `📞 *Phone:* ${form.phone || "—"}`,
      `🗺️ *Trip Type:* ${form.tripType || "—"}`,
      `💬 *Message:* ${form.message || "—"}`,
    ].join("\n");
    window.open(`https://wa.me/919906503339?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <>
      <ScrollProgress />

      <div className="relative z-2 bg-animated">
        <Navbar />

        {/* Page hero */}
        <div
          className="relative pt-32 pb-16 overflow-hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-64 rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-7xl mx-auto px-6 text-center"
          >
            <p className="text-primary text-xs font-mono uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-gradient mb-5">
              Contact Us
            </h1>
            <p
              className="max-w-xl mx-auto text-sm lg:text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Planning a Kashmir trip? Tell us your dream itinerary and we'll craft a personalised package just for you.
            </p>
          </motion.div>
        </div>

        {/* Main content */}
        <section className="py-16" style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="font-playfair text-3xl font-bold text-white mb-2">
                  Let's plan your <span className="text-gradient">Kashmir journey</span>
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Our travel experts are available six days a week to help you choose the right package, customise your itinerary, and answer any questions.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map(({ icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.12)" }}
                  >
                    <span className="text-primary mt-0.5 shrink-0">{icon}</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-white/80 text-sm hover:text-primary-light transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp quick CTA */}
              <motion.a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl text-white font-bold transition-all duration-200"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={20} />
                Chat with us on WhatsApp
              </motion.a>

              <div
                className="p-4 rounded-xl text-xs"
                style={{
                  background: "rgba(14,165,233,0.06)",
                  border: "1px solid rgba(14,165,233,0.15)",
                  color: "var(--text-muted)",
                }}
              >
                <span className="font-bold text-primary-light">Excursion Agent Reg No:</span>{" "}
                <span className="font-mono text-white/60">JKEA00005258</span>
                <br />
                Registered with J&K Tourism Board
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(14,165,233,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <CheckCircle size={56} className="text-emerald-400" />
                    <h3 className="font-playfair text-2xl font-bold text-white">Message Received!</h3>
                    <p className="text-white/50 text-sm max-w-xs">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", tripType: "", message: "" }); }}
                      className="mt-4 text-primary-light text-sm underline underline-offset-4 hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-playfair text-xl font-bold text-white mb-6">Send us a message</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(14,165,233,0.18)",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(14,165,233,0.18)",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(14,165,233,0.18)",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Trip Type</label>
                        <select
                          name="tripType"
                          value={form.tripType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(14,165,233,0.18)",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                        >
                          <option value="" className="bg-slate-900">Select trip type</option>
                          {tripTypes.map((t) => (
                            <option key={t} value={t} className="bg-slate-900">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your dream Kashmir trip — dates, group size, preferences…"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(14,165,233,0.18)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.18)")}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl text-sm font-bold transition-colors duration-200 shadow-lg"
                      style={{ background: "#25D366", boxShadow: "0 8px 20px rgba(37,211,102,0.3)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <WhatsAppFloat />
    </>
  );
}
