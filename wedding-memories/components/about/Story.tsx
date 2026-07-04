"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Story() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[var(--ivory)] py-12 sm:py-16"
    >
      {/* Background Decoration — smaller/less blur on mobile so it doesn't
          dominate a narrow viewport or hurt paint performance */}
      <div className="absolute -left-16 top-16 h-40 w-40 rounded-full bg-[var(--gold-light)]/25 blur-2xl sm:-left-24 sm:top-24 sm:h-72 sm:w-72 sm:blur-3xl" />
      <div className="absolute -right-16 bottom-16 h-40 w-40 rounded-full bg-[var(--maroon)]/10 blur-2xl sm:-right-24 sm:bottom-24 sm:h-72 sm:w-72 sm:blur-3xl" />

      <div className="container relative z-10 px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-[var(--border)] sm:rounded-[32px]">
              <Image
                src="/covers/story.jpg"
                alt="Harshit and Sakshi"
                width={900}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 50vw"
                // aspect-[3/4] instead of a fixed pixel height keeps the
                // crop consistent across all screen widths (390px iPhones,
                // 412px Galaxy S20 Ultra, tablets, desktop) instead of
                // forcing a 700px-tall box that gets absurdly narrow-tall
                // on phones.
                className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105 sm:aspect-[3/4] lg:h-[700px] lg:aspect-auto"
              />
            </div>

            {/* Floating Card — anchored inside the image bounds on mobile
                so it never gets clipped by the viewport edge; only
                escapes outward at sm+ where there's room */}
            <div className="absolute bottom-4 right-4 rounded-2xl border-t-2 border-[var(--gold)] bg-white px-5 py-4 shadow-xl sm:-bottom-8 sm:-right-8 sm:rounded-3xl sm:px-8 sm:py-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] sm:text-xs sm:tracking-[0.35em]">
                Wedding Date
              </p>
              <h3
                className="mt-1.5 text-lg text-[var(--charcoal)] sm:mt-2 sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                11 March 2026
              </h3>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            // extra top margin on mobile so the floating card (now inside
            // the image) has breathing room before the text starts
            className="mt-6 sm:mt-0"
          >
            <span className="section-subtitle">Our Story</span>

            <h2 className="section-title mt-4 text-[var(--charcoal)] text-3xl sm:mt-5 sm:text-4xl md:text-5xl">
              Two Hearts.
              <br />
              One Beautiful Beginning.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[var(--muted-foreground)] sm:mt-8 sm:text-base sm:leading-8">
              Weddings are not just ceremonies. They are a beautiful
              collection of emotions, traditions, blessings and
              unforgettable memories shared with family and friends.
            </p>

            <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)] sm:mt-6 sm:text-base sm:leading-8">
              Every smile, every ritual and every photograph captured
              during Harshit and Sakshi&rsquo;s wedding tells a story that
              deserves to be remembered forever.
            </p>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--ivory-warm)] p-5 sm:rounded-3xl sm:p-7">
                <h3
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
                >
                  11
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:tracking-[0.25em]">
                  Beautiful Events
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--ivory-warm)] p-5 sm:rounded-3xl sm:p-7">
                <h3
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--gold)" }}
                >
                  5000+
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] sm:mt-3 sm:text-sm sm:tracking-[0.25em]">
                  Memories Captured
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}