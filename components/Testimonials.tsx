"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CONFIG from "@/lib/config";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });
  const total = CONFIG.testimonials.length;

  const go = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const next = useCallback(() => go((current + 1) % total, 1), [current, total, go]);
  const prev = useCallback(() => go((current - 1 + total) % total, -1), [current, total, go]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = CONFIG.testimonials[current];

  return (
    <section
      className="bg-dark overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top gold rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="py-14 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">

          {/* Label + heading */}
          <div ref={headingRef} className="text-center mb-10 md:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-dm-sans text-gold text-xs tracking-[0.35em] uppercase mb-5"
            >
              Client Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant text-cream text-4xl md:text-5xl lg:text-6xl"
            >
              What Our Clients Say
            </motion.h2>
          </div>

          {/* Main card */}
          <div className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full text-center px-4 md:px-16"
              >
                {/* Large decorative quote */}
                <div
                  className="font-cormorant text-gold/20 select-none leading-none mb-2"
                  style={{ fontSize: "clamp(60px, 10vw, 100px)", lineHeight: 0.8 }}
                  aria-hidden
                >
                  &ldquo;
                </div>

                {/* Testimonial text */}
                <p className="font-cormorant italic text-cream text-xl md:text-2xl lg:text-3xl leading-snug mb-7 max-w-3xl mx-auto">
                  {t.text}
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1.5 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-12 bg-gold/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  <div className="h-px w-12 bg-gold/40" />
                </div>

                {/* Author */}
                <p className="font-dm-sans font-semibold text-cream text-sm tracking-wider uppercase">
                  {t.name}
                </p>
                <p className="font-dm-sans text-gold/70 text-xs tracking-[0.2em] uppercase mt-1">
                  {t.project}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-3">
              {CONFIG.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="group flex items-center justify-center min-w-[28px] min-h-[28px]"
                >
                  <span
                    className={`block rounded-full transition-all duration-400 ${
                      i === current
                        ? "w-7 h-1 bg-gold"
                        : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
