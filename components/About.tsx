"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CONFIG from "@/lib/config";

function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <FadeInUp>
              <p className="font-dm-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">
                About the Studio
              </p>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="font-cormorant text-dark text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                Where Design Meets{" "}
                <em className="italic text-gold">Human Story</em>
              </h2>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="font-dm-sans text-brand-gray text-base leading-relaxed mb-5">
                Founded on the belief that great design is deeply personal, our
                studio has spent over a decade crafting interiors that are
                beautiful, functional, and utterly unique to each client. We
                listen before we design — immersing ourselves in your world to
                understand how you live, work, and dream.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <p className="font-dm-sans text-brand-gray text-base leading-relaxed mb-10">
                From conceptual mood boards to the final placement of a carefully
                chosen objet d&apos;art, we orchestrate every detail with precision.
                Our process is collaborative, transparent, and grounded in a
                profound respect for craft, quality, and your vision.
              </p>
            </FadeInUp>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {CONFIG.stats.map((stat, i) => (
                <FadeInUp key={stat.label} delay={0.4 + i * 0.1}>
                  <div className="border-l-2 border-gold pl-4 py-2">
                    <p className="font-cormorant text-dark text-3xl md:text-4xl font-semibold">
                      {stat.value}
                    </p>
                    <p className="font-dm-sans text-brand-gray text-xs leading-snug mt-1">
                      {stat.label}
                    </p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 40, rotate: 0 }}
            animate={isImageInView ? { opacity: 1, x: 0, rotate: -2 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800"
                alt="Interior design studio work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 rounded-sm -z-10 rotate-1" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
