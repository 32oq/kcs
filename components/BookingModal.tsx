"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Mail,
  Phone,
  User,
  CalendarDays,
  Users,
  Star,
} from "lucide-react";
import type { Package } from "@/lib/packages";
import { formatPrice } from "@/lib/packages";
import { generateWhatsAppLink, type BookingForm } from "@/lib/whatsapp";

interface Props {
  pkg: Package;
  onClose: () => void;
}

const inputWrap = "relative";
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all duration-200";
const iconClass =
  "absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none";

export default function BookingModal({ pkg, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    email: "",
    date: "",
    guests: "2",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

  const set = (key: keyof BookingForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const err: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.name.trim())  err.name  = "Name is required";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      err.phone = "Valid 10-digit phone required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Valid email required";
    if (!form.date) err.date = "Travel date is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep(2);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative w-full max-w-md glass-dark rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
          style={{ border: "1px solid rgba(14,165,233,0.2)" }}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Step pills */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                      s <= step ? "bg-primary text-white shadow-lg shadow-primary/40" : "bg-white/8 text-white/35"
                    }`}
                  >
                    {s < step ? <CheckCircle size={12} /> : s}
                  </div>
                  {s < 2 && (
                    <div className={`h-px w-10 rounded transition-all duration-500 ${step >= 2 ? "bg-primary" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
              <span className="ml-1 text-white/35 text-xs">
                {step === 1 ? "Your Details" : "Confirm on WhatsApp"}
              </span>
            </div>

            {/* Package mini-card */}
            <div className="flex items-center gap-3">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <Star size={10} fill="#fbbf24" className="text-yellow-400" />
                  <span className="text-yellow-400 text-[11px] font-bold">{pkg.rating}</span>
                  <span className="text-white/30 text-[11px]">· {pkg.category}</span>
                </div>
                <h2 className="font-serif text-base font-bold text-white truncate">{pkg.title}</h2>
                <div className="flex items-center gap-3 text-[11px] text-white/40 mt-0.5">
                  <span className="flex items-center gap-1"><Clock size={9} />{pkg.nights}N/{pkg.days}D</span>
                  <span className="flex items-center gap-1"><MapPin size={9} />{pkg.locations[0]}</span>
                  <span className="text-primary font-bold">{formatPrice(pkg.price)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/6 hover:bg-white/14 text-white/50 hover:text-white transition-all"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                onSubmit={handleSubmit}
                className="px-6 py-5 space-y-3.5"
              >
                {/* Name */}
                <div>
                  <div className={inputWrap}>
                    <User size={14} className={iconClass} />
                    <input className={inputClass} placeholder="Full Name" value={form.name} onChange={set("name")} />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <div className={inputWrap}>
                    <Phone size={14} className={iconClass} />
                    <input className={inputClass} placeholder="Phone (10 digits)" type="tel" value={form.phone} onChange={set("phone")} />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className={inputWrap}>
                    <Mail size={14} className={iconClass} />
                    <input className={inputClass} placeholder="Email address" type="email" value={form.email} onChange={set("email")} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
                </div>

                {/* Date + Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className={inputWrap}>
                      <CalendarDays size={14} className={iconClass} />
                      <input
                        className={inputClass}
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={set("date")}
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                    {errors.date && <p className="text-red-400 text-xs mt-1 pl-1">{errors.date}</p>}
                  </div>
                  <div className={inputWrap}>
                    <Users size={14} className={iconClass} />
                    <select
                      className={inputClass}
                      value={form.guests}
                      onChange={set("guests")}
                    >
                      {["1","2","3","4","5","6","7","8","9","10+"].map((n) => (
                        <option key={n} value={n} className="bg-dark-card">{n} {n === "1" ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className={inputWrap}>
                  <textarea
                    className={`${inputClass} pl-4 resize-none h-18`}
                    placeholder="Special requests, dietary needs, anniversaries..."
                    value={form.notes}
                    onChange={set("notes")}
                    rows={3}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold text-sm transition-colors duration-200 shadow-lg shadow-primary/30"
                >
                  Continue to WhatsApp →
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="px-6 py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle size={30} className="text-primary" />
                </motion.div>

                <h3 className="font-serif text-xl font-bold text-white mb-2">Ready to Send!</h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                  Your inquiry for <span className="text-white font-semibold">{pkg.title}</span> is ready.
                  Tap below to connect with our travel experts instantly on WhatsApp.
                </p>

                {/* Summary */}
                <div className="rounded-xl p-4 text-left mb-5 space-y-2.5" style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.15)" }}>
                  {[
                    { label: "Name",   val: form.name },
                    { label: "Phone",  val: form.phone },
                    { label: "Email",  val: form.email },
                    { label: "Date",   val: form.date },
                    { label: "Guests", val: `${form.guests} guest(s)` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-white/40">{label}</span>
                      <span className="text-white font-medium truncate max-w-45">{val}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(generateWhatsAppLink(pkg, form), "_blank")}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white py-4 rounded-xl font-bold text-sm transition-colors duration-200 shadow-xl shadow-green-600/25 mb-3"
                >
                  <MessageCircle size={18} />
                  Continue on WhatsApp
                </motion.button>
                <button onClick={() => setStep(1)} className="text-white/35 hover:text-white/60 text-sm transition-colors">
                  ← Edit details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
