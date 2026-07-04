"use client";

import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

interface ImageControlsProps {
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export default function ImageControls({
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
  onDownload,
  onShare,
}: ImageControlsProps) {
  return (
    <>
      {/* Top bar: counter + download + share + close, blurred background */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5 sm:py-7 z-20 backdrop-blur-md bg-[#181312]/40 border-b border-white/5">
        <span className="text-white/90 font-light text-sm sm:text-base tracking-[0.15em]">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onDownload}
            aria-label="Download image"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white/85 hover:text-[var(--gold)] hover:bg-white/10 transition-all duration-300"
          >
            <Download size={20} />
          </button>
          <button
            onClick={onShare}
            aria-label="Share image"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white/85 hover:text-[var(--gold)] hover:bg-white/10 transition-all duration-300"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white/85 hover:text-[var(--gold)] hover:bg-white/10 transition-all duration-300"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Prev arrow, vertically centered */}
      <button
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white/80 hover:text-[var(--gold)] hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>

      {/* Next arrow, vertically centered */}
      <button
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white/80 hover:text-[var(--gold)] hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>
    </>
  );
}