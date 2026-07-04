"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 ${className}`}
      fill="none"
    >
      <path
        d="M2 2 L2 16 M2 2 L16 2"
        stroke="#E8CE86"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M2 2 C 14 2 22 10 22 22"
        stroke="#E8CE86"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="22" cy="22" r="2" fill="#E8CE86" />
    </svg>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#4A0E18]"
      style={{
        // 100dvh handles iOS Safari's shrinking toolbar and Android nav bar
        // properly instead of h-screen, which jumps/clips on scroll.
        height: "100dvh",
        minHeight: "600px",
      }}
    >
      <Image
        src="/covers/hero.jpg"
        alt="Harshit and Sakshi wedding"
        fill
        priority
        sizes="100vw"
        // Less aggressive scale + explicit position keeps the subject
        // centered on tall/narrow screens (S20 Ultra is ~20:9) instead
        // of cropping heavily top/bottom like scale-110 does.
        className="scale-105 object-cover object-center sm:scale-110"
      />

      <div className="hero-overlay-warm absolute inset-0" />

      {/* Ornamental frame — tighter inset + smaller flourishes on small screens
          so the border doesn't crowd the text on narrow phones */}
      <div className="pointer-events-none absolute inset-4 border border-[rgba(232,206,134,0.35)] sm:inset-6 md:inset-10">
        <CornerFlourish className="absolute -left-2 -top-2 sm:-left-3 sm:-top-3" />
        <CornerFlourish className="absolute -right-2 -top-2 rotate-90 sm:-right-3 sm:-top-3" />
        <CornerFlourish className="absolute -bottom-2 -right-2 rotate-180 sm:-bottom-3 sm:-right-3" />
        <CornerFlourish className="absolute -bottom-2 -left-2 -rotate-90 sm:-bottom-3 sm:-left-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1 }}
        className="absolute inset-0 flex items-center justify-center px-5 sm:px-6"
        style={{
          // Respect notch / dynamic island / home-indicator zones
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="max-h-full overflow-y-auto text-center text-white [scrollbar-width:none]">
          <div className="divider-ornament mb-5 sm:mb-7">
            <span className="line" />
            <span className="diamond" />
            <span className="line" />
          </div>

          <p className="hero-subtitle mb-6 sm:mb-8">Wedding Memories</p>

          <h1
            className="heading-xl text-4xl leading-tight sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Harshit
            <br />
            <span className="italic" style={{ color: "#E8CE86" }}>
              &
            </span>
            <br />
            Sakshi
          </h1>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[rgba(232,206,134,0.5)] px-6 py-2 sm:mt-12 sm:px-7 sm:py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8CE86]" />
            <span className="hero-date text-sm sm:text-base">11 March 2026</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8CE86]" />
          </div>

          <p className="hero-description mt-6 px-2 text-sm sm:mt-8 sm:px-0 sm:text-base">
            A timeless collection of love, traditions, laughter and
            unforgettable memories.
          </p>

          {/* min-h-11 (44px) keeps the tap target comfortable on all
              touchscreens per Apple/Google HIG guidance */}
          <button className="btn-primary mt-8 min-h-11 px-6 sm:mt-10">
            Explore Memories
          </button>
        </div>
      </motion.div>

      {/* Scroll cue — hidden on very short viewports so it doesn't
          overlap the button on landscape phones or small screens */}
      <div
        className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/70 min-[700px]:flex"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.span
          className="h-10 w-px bg-[rgba(232,206,134,0.6)]"
          style={{ transformOrigin: "top" }}
          animate={
            shouldReduceMotion
              ? undefined
              : { scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}