"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageViewer from "./ImageViewer";
import ImageControls from "./ImageControls";
import Filmstrip from "./Filmstrip";

interface LightboxProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null;
  const [direction, setDirection] = useState(0);

  const goPrev = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(-1);
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(1);
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  const goToIndex = useCallback(
    (index: number) => {
      if (currentIndex === null) return;
      setDirection(index > currentIndex ? 1 : -1);
      onNavigate(index);
    },
    [currentIndex, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  async function handleDownload() {
    if (currentIndex === null) return;
    const src = images[currentIndex];
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

  async function handleShare() {
    if (currentIndex === null) return;
    const src = images[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({ url: src });
      } catch {
        // user cancelled share, no-op
      }
    } else {
      await navigator.clipboard.writeText(src);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && currentIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-[#181312]/97 flex items-center justify-center"
        >
          <ImageViewer
            src={images[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            direction={direction}
          />
          <ImageControls
            currentIndex={currentIndex}
            total={images.length}
            onClose={onClose}
            onPrev={goPrev}
            onNext={goNext}
            onDownload={handleDownload}
            onShare={handleShare}
          />
          <Filmstrip
            images={images}
            currentIndex={currentIndex}
            onSelect={goToIndex}
          />

          <button
            aria-label="Close lightbox"
            className="absolute inset-0 z-0"
            onClick={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}