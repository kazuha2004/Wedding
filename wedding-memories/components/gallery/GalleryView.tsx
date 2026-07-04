"use client";

import { useState } from "react";
import GalleryMasonry from "./GalleryMasonry";
import Lightbox from "@/components/lightbox/Lightbox";

interface GalleryViewProps {
  images: string[];
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="py-6 sm:py-10">
      <GalleryMasonry images={images} onImageClick={setActiveIndex} />
      <Lightbox
        images={images}
        currentIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}