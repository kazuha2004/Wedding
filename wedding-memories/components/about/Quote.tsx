"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Quote() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[var(--ivory-warm)] py-12 sm:py-16"
      id="quote"
    >
      {/* Decorative Background — scaled down on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-80px] top-[-80px] h-40 w-40 rounded-full bg-[var(--gold-light)]/40 blur-2xl sm:left-[-120px] sm:top-[-120px] sm:h-72 sm:w-72 sm:blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-80px] h-40 w-40 rounded-full bg-[var(--maroon)]/10 blur-2xl sm:bottom-[-120px] sm:right-[-120px] sm:h-72 sm:w-72 sm:blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        {/* Decorative quote mark */}
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="block select-none text-4xl leading-none text-[var(--gold)]/50 sm:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        {/* Top divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="divider-ornament -mt-2 mb-4 sm:-mt-4 sm:mb-5"
        >
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </motion.div>

        {/* Quote — smaller, tighter leading on phones so 3 lines don't
            require heavy scaling and stay readable at ~360-412px widths */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9 }}
          className="text-2xl leading-snug text-[var(--charcoal)] sm:text-3xl sm:leading-relaxed md:text-5xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Every photograph captures
          <br />
          a moment,
          <br />
          but every memory lasts forever.
        </motion.h2>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: shouldReduceMotion ? 0 : 0.8 }}
          className="mt-6 sm:mt-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] sm:text-sm sm:tracking-[0.45em]">
            Harshit <span className="italic text-[var(--maroon)]">&</span> Sakshi
          </p>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0 : 0.8 }}
          className="divider-ornament mt-5 sm:mt-7"
        >
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </motion.div>
      </div>
    </section>
  );
}