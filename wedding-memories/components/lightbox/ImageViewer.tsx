"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageViewerProps {
  src: string;
  alt: string;
  direction?: number;
}

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 60 : -60,
    scale: 0.98,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -60 : 60,
    scale: 0.98,
  }),
};

export default function ImageViewer({ src, alt, direction = 0 }: ImageViewerProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 sm:px-20 py-24 sm:py-28">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={src}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative w-full h-full max-w-[1400px] max-h-[85vh] flex items-center justify-center"
        >
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes="100vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}