"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[var(--maroon-deep)]">
      {/* Gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="container flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-full max-w-2xl flex-col items-center py-16 text-center"
        >
          <h2
            className="text-4xl text-white md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Harshit <span className="italic text-[var(--gold-light)]">&</span> Sakshi
          </h2>

          <p className="mt-4 text-lg italic text-[var(--gold-light)]">
            Two Hearts • One Journey • Forever
          </p>

          <div className="divider-ornament my-5">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>

          <p className="max-w-xl text-base leading-8 text-white/75">
            Thank you for celebrating our love and becoming a beautiful part
            of our forever story.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-[var(--gold)]/30 px-8 py-3">
            <span className="tracking-[0.35em] text-[var(--gold-light)]">
              11 MARCH 2026
            </span>
          </div>

          <div className="mt-7 w-full border-t border-[var(--gold)]/20 pt-8">
            <p className="text-sm uppercase tracking-[0.45em] text-white/50">
              Crafted with ❤️ by Priyanshu
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}