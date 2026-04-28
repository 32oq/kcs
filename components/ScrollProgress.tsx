"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{
        scaleX: scrollYProgress,
        background:
          "linear-gradient(90deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
      }}
    />
  );
}
