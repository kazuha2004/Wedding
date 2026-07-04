"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineCardProps {
  title: string;
  date: string;
  description: string;
  position: "top" | "bottom";
  delay?: number;
  compact?: boolean;
}

export default function TimelineCard({
  title,
  date,
  description,
  position,
  delay = 0,
  compact = false,
}: TimelineCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: position === "top" ? -8 : 8, scale: 1.02 }
      }
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : position === "top" ? 24 : -24,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay }}
      className={`group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#F0DCC4] bg-white text-center shadow-[0_4px_20px_rgba(178,58,72,0.06)] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(178,58,72,0.14)] ${
        compact ? "h-[155px] px-4 py-3.5" : "h-[190px] px-7 py-5"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E7C89A] via-[#B23A48] to-[#E7C89A] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      <span
        className={`relative z-10 font-medium uppercase text-[#B23A48] ${
          compact ? "text-[9px] tracking-[0.2em]" : "text-[10px] tracking-[0.25em]"
        }`}
      >
        {date}
      </span>

      <h3
        className={`relative z-10 line-clamp-2 leading-snug text-[#2B2222] ${
          compact ? "mt-1.5 text-base" : "mt-2 text-xl"
        }`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h3>

      <p
        className={`relative z-10 line-clamp-3 leading-5 text-[#6D5E5E] ${
          compact ? "mt-1.5 text-[12px]" : "mt-2 text-[13px]"
        }`}
      >
        {description}
      </p>

      <span className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-[#F4E6DD]/60 blur-xl transition-transform duration-300 group-hover:scale-125" />
    </motion.div>
  );
}