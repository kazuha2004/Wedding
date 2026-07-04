"use client";

import { motion } from "framer-motion";

export default function FeaturedEvent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center text-center gap-6"
    >
      <span className="section-subtitle">
        WEDDING COLLECTION
      </span>

      <h2
        className="text-6xl leading-none text-[#2B2323]"
        style={{
          fontFamily: "var(--font-heading)",
        }}
      >
        Wedding Events
      </h2>

      <div className="h-[2px] w-24 rounded-full bg-[#D8B16C]" />

      <p
        className="max-w-3xl px-6 text-center text-[22px] italic leading-10 text-[#8E7252]"
        style={{
          fontFamily: "var(--font-heading)",
        }}
      >
        Reliving every smile, one memory at a time.
      </p>
    </motion.div>
  );
}