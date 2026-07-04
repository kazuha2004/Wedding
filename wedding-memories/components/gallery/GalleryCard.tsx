"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Event } from "@/types/event";

interface GalleryCardProps {
  event: Event;
}

export default function GalleryCard({ event }: GalleryCardProps) {
  return (
    <Link href={`/gallery/${event.folder}`} className="block group">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[28px] bg-[var(--ivory)] shadow-md hover:shadow-2xl transition-shadow duration-500 border border-[var(--gold)]/20"
      >
        <div className="relative w-full h-72 overflow-hidden">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/70 via-[var(--charcoal)]/10 to-transparent" />

          <span className="absolute top-5 left-6 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/85">
            Wedding Album
          </span>
        </div>

        <div className="p-7 sm:p-8 text-center">
          <h3
            className="text-2xl sm:text-[28px] text-[var(--charcoal)] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {event.title}
          </h3>

          <div className="h-[2px] w-10 rounded-full bg-[var(--gold)] mx-auto mb-4" />

          <p className="text-[var(--muted-foreground)] text-sm font-light leading-6 mb-6 px-2">
            {event.description}
          </p>

          <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[var(--gold)] group-hover:gap-2.5 transition-all duration-300">
            View Album
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}