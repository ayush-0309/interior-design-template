"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CONFIG from "@/lib/config";

interface LightboxProps {
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const image = CONFIG.portfolioImages[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[80vh] mx-16 aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </motion.div>

        {/* Caption */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="font-cormorant text-cream text-xl italic">{image.title}</p>
          <p className="font-dm-sans text-gold text-xs tracking-widest uppercase mt-1">{image.category}</p>
          <p className="font-dm-sans text-white/40 text-xs mt-2">
            {currentIndex + 1} / {CONFIG.portfolioImages.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
