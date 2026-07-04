"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
  priority?: boolean;
}

export default function EventCard({
  event,
  priority = false,
}: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className="
        overflow-hidden
        rounded-[34px]
        bg-white
        border
        border-[var(--border)]
        shadow-md
        transition-all
        duration-500
        hover:shadow-2xl
      "
    >
      <Link
        href={`/gallery/${event.folder}`}
        className="group flex h-full flex-col"
      >
        <div className="relative h-80 overflow-hidden">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            priority={priority}
            sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-between p-9 text-center">
          <div>
            <h3
              className="text-[30px] leading-tight text-[var(--charcoal)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {event.title}
            </h3>

            <p className="mx-auto mt-4 max-w-[290px] text-[14px] leading-6 text-[var(--muted-foreground)]">
              {event.description}
            </p>
          </div>

          <div className="mt-10">
            <span className="text-[15px] uppercase tracking-[0.25em] text-[var(--gold)] transition-all duration-300 group-hover:tracking-[0.35em]">
              View Album →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}