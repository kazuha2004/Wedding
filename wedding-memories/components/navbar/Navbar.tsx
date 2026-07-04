"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Journey", href: "#journey" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-[#2A1810]" : "text-white";
  const ampersandColor = scrolled ? "#C9A227" : "#E8CE86";

  const linkShadow = scrolled
    ? "none"
    : "0 1px 3px rgba(20,6,10,.9), 0 2px 12px rgba(20,6,10,.6)";

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(251,243,231,0.88)] backdrop-blur-xl shadow-[0_4px_30px_rgba(74,14,24,0.08)] border-b border-[rgba(201,162,39,0.15)]"
            : "bg-transparent"
        }`}
      >
        {/* Warm maroon-black wash so nav text reads over any part of the hero photo */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[rgba(20,6,10,0.78)] via-[rgba(42,14,20,0.32)] to-transparent" />
        )}

        <div className="container relative flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span
              className={`text-4xl font-semibold transition-colors duration-300 ${textColor}`}
              style={{
                fontFamily: "var(--font-heading)",
                textShadow: scrolled ? "none" : "0 4px 18px rgba(20,6,10,.6)",
              }}
            >
              Harshit{" "}
              <span className="italic" style={{ color: ampersandColor }}>
                &
              </span>{" "}
              Sakshi
            </span>

            <span
              className={`mt-1 text-xs uppercase tracking-[0.45em] transition-colors duration-300 ${
                scrolled ? "text-[#8A7361]" : "text-white/80"
              }`}
            >
              Wedding Memories
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-10 rounded-full lg:flex ${
              !scrolled
                ? "bg-[rgba(74,14,24,0.35)] px-8 py-3 backdrop-blur-sm border border-[rgba(232,206,134,0.25)]"
                : ""
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${textColor}`}
                style={{ textShadow: linkShadow }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-[#C9A227]" : "bg-[#E8CE86]"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenu(true)}
            className={`rounded-full transition-colors duration-300 lg:hidden ${textColor} ${
              !scrolled
                ? "bg-[rgba(74,14,24,0.35)] p-2 backdrop-blur-sm border border-[rgba(232,206,134,0.25)]"
                : ""
            }`}
            style={{ textShadow: linkShadow }}
            aria-label="Open menu"
          >
            <Menu size={30} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] bg-[#FBF3E7]"
          >
            <div className="container flex h-full flex-col">
              <div className="flex h-24 items-center justify-between">
                <span
                  className="text-4xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Harshit{" "}
                  <span className="italic" style={{ color: "#C9A227" }}>
                    &
                  </span>{" "}
                  Sakshi
                </span>

                <button onClick={() => setMobileMenu(false)} aria-label="Close menu">
                  <X size={30} />
                </button>
              </div>

              <div className="mt-24 flex flex-col gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className="text-4xl transition hover:text-[#C9A227]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}