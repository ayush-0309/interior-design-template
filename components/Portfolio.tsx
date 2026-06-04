"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import CONFIG from "@/lib/config";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

export default function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + CONFIG.portfolioImages.length) % CONFIG.portfolioImages.length)), []);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % CONFIG.portfolioImages.length)), []);

  return (
    <>
      <section id="portfolio" className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-dm-sans text-gold text-xs tracking-[0.3em] uppercase mb-4"
            >
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant text-dark text-4xl md:text-5xl lg:text-6xl"
            >
              Our Work
            </motion.h2>
          </div>

          {/* Mobile: horizontal swipe carousel */}
          <div className="md:hidden -mx-4 px-4">
            <div
              className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {CONFIG.portfolioImages.map((image, i) => (
                <div
                  key={image.src}
                  className="flex-none w-[80vw] snap-center"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden cursor-pointer group">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-500 group-active:scale-105"
                      sizes="80vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-active:bg-black/40 transition-all duration-200 flex items-end p-5">
                      <div>
                        <p className="font-cormorant text-cream text-lg italic">{image.title}</p>
                        <p className="font-dm-sans text-gold text-xs tracking-widest uppercase mt-0.5">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Swipe hint */}
            <p className="text-center font-dm-sans text-brand-gray text-xs tracking-widest uppercase mt-2">
              Swipe to explore
            </p>
          </div>

          {/* Desktop: masonry grid */}
          <div className="hidden md:block masonry-grid">
            {CONFIG.portfolioImages.map((image, i) => (
              <PortfolioItem
                key={image.src}
                image={image}
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

function PortfolioItem({
  image,
  index,
  onClick,
}: {
  image: (typeof CONFIG.portfolioImages)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const aspectClasses = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-square"];
  const aspect = aspectClasses[index % aspectClasses.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="masonry-item"
    >
      <div
        className={`relative ${aspect} w-full rounded-sm overflow-hidden cursor-pointer group`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        aria-label={`View ${image.title}`}
      >
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-end p-6">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="font-cormorant text-cream text-xl italic">{image.title}</p>
            <p className="font-dm-sans text-gold text-xs tracking-widest uppercase mt-1">{image.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
