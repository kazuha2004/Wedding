"use client";

import { motion, useReducedMotion } from "framer-motion";
import TimelineWave from "./TimelineWave";

const timeline = [
  {
    date: "02 October 2025",
    title: "Engagement",
    description:
      "The beginning of a beautiful journey where two families became one.",
  },
  {
    date: "21 February 2026",
    title: "Tilak Ceremony",
    description:
      "A traditional celebration filled with blessings, rituals and happiness.",
  },
  {
    date: "09/10 March 2026",
    title: "Haldi & Mehendi",
    description:
      "A day of colours, laughter, music and unforgettable memories with loved ones.",
  },
  {
    date: "11 March 2026",
    title: "Wedding Ceremony",
    description:
      "The day Harshit and Sakshi began a beautiful new chapter together.",
  },
];

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      // pt-32/40 gives real breathing room (128-160px) since the previous
      // section shares the same bg-[var(--ivory-warm)] — same-color
      // sections need MORE padding than usual to visually separate,
      // since there's no color break doing the work for you.
      className="relative overflow-hidden bg-[var(--ivory-warm)] pb-14 pt-16 sm:pb-16 sm:pt-40"
    >
      {/* subtle seam so the two same-colour sections don't visually fuse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.035), transparent)",
        }}
      />

      <div className="container px-5 sm:px-6">
        <div className="mx-auto mb-10 flex items-center justify-center gap-3 sm:mb-12">
          <span className="h-px w-10 bg-[#E8CE86] sm:w-16" />
          <span className="h-2 w-2 rotate-45 bg-[#E8CE86]" />
          <span className="h-px w-10 bg-[#E8CE86] sm:w-16" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <span className="section-subtitle">WEDDING JOURNEY</span>

          <h2 className="section-title mt-4 text-3xl text-[var(--charcoal)] sm:mt-6 sm:text-4xl md:text-5xl">
            Every Moment
            <br />
            Led To Forever
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="mx-auto mt-6 max-w-3xl px-2 text-center text-sm italic leading-7 text-[var(--muted-foreground)] sm:mt-8 sm:px-6 sm:text-[18px] sm:leading-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;Every celebration tells a story. From the engagement to
            the wedding day, each event created memories that will last a
            lifetime.&rdquo;
          </motion.p>
        </motion.div>

        <div
          className="relative mt-10 -mx-5 sm:mt-12 sm:-mx-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
          }}
        >
          <p className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]/70 sm:hidden">
            ← Swipe to explore →
          </p>

          <div className="flex justify-start overflow-x-auto pb-8 pl-5 pr-16 snap-x snap-mandatory sm:justify-center sm:pl-6 sm:pr-24 [scrollbar-width:thin]">
            <TimelineWave events={timeline} />
          </div>
        </div>
      </div>
    </section>
  );
}