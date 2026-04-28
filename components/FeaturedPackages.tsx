"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import PackageCard from "./PackageCard";
import { packages } from "@/lib/packages";
import type { Package } from "@/lib/packages";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FeaturedPackages({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="packages" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          {/* Label row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary-light text-xs font-bold uppercase tracking-[0.22em]">
              <Compass size={13} />
              <span>Packages</span>
            </div>
            <motion.a
              href="#packages"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              className="text-primary-light text-sm font-semibold flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              View all packages
              <span className="text-base leading-none">→</span>
            </motion.a>
          </div>

          {/* H2 */}
          <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "var(--text)" }}>
            Best Selling Tours
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={card}>
              <PackageCard pkg={pkg} onBook={onBook} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Don't see what you're looking for?
          </p>
          <motion.a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-primary/30 hover:border-primary/60 text-primary-light px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:bg-primary/8"
          >
            Build a Custom Package →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
