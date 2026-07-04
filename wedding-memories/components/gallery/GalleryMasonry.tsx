"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";

interface GalleryMasonryProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export default function GalleryMasonry({
  images,
  onImageClick,
}: GalleryMasonryProps) {
  async function handleDownload(e: React.MouseEvent, src: string) {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = src.split("/").pop() || "photo.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
      {/* columns-2 as the base (mobile) so phones get a 2-up grid instead of
          a single full-width column — desktop breakpoints (sm/md/lg) are
          untouched. gap-4 sm:gap-8 = 16px mobile / 32px desktop, matching
          the original 32px columnGap exactly at sm and up. */}
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-8">
        {images.map((src, index) => (
          <motion.div
            key={src}
            style={{ breakInside: "avoid" }}
            // mb-4 sm:mb-10 replaces the old inline marginBottom: 40px —
            // Tailwind v4 renders this reliably now, and this way mobile
            // gets a tighter 16px gap while sm+ keeps the original 40px.
            className="cursor-pointer overflow-hidden rounded-[16px] sm:rounded-[24px] border border-[#EFE4D3] shadow-lg hover:shadow-2xl transition-shadow duration-500 group relative [content-visibility:auto] [contain-intrinsic-size:300px_400px] mb-4 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
            onClick={() => onImageClick(index)}
          >
            <div className="relative w-full bg-[#EFE4D3]">
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                width={600}
                height={800}
                unoptimized
                placeholder="empty"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading={index < 4 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30">
                  <Eye size={20} className="text-white" strokeWidth={1.5} />
                </div>
              </div>

              <span className="absolute bottom-4 left-4 text-white/85 text-xs font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {index + 1} / {images.length}
              </span>

              <button
                onClick={(e) => handleDownload(e, src)}
                aria-label="Download this photo"
                className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[var(--charcoal)] opacity-0 group-hover:opacity-100 hover:bg-[var(--gold)] hover:text-white transition-all duration-300 shadow-md"
              >
                <Download size={17} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}