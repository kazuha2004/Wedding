"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface FilmstripProps {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function Filmstrip({
  images,
  currentIndex,
  onSelect,
}: FilmstripProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentIndex]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-0 left-0 right-0 z-20 pt-10 pb-4 sm:pb-6 bg-gradient-to-t from-[#181312]/95 via-[#181312]/60 to-transparent"
    >
      <div
        className="flex gap-2 sm:gap-3 overflow-x-auto px-6 sm:px-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, index) => (
          <button
            key={src}
            ref={index === currentIndex ? activeRef : null}
            onClick={() => onSelect(index)}
            aria-label={`Go to photo ${index + 1}`}
            className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "ring-2 ring-[var(--gold)] opacity-100 scale-105"
                : "ring-1 ring-white/15 opacity-45 hover:opacity-80"
            }`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              fill
              unoptimized
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}