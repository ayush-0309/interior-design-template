"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CONFIG from "@/lib/config";

function SofaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v3H3V9z" />
      <path d="M1 12h22v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4z" />
      <path d="M5 18v2M19 18v2" />
      <path d="M1 14h2M21 14h2" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 19.5L19.5 3" />
      <path d="M3 3h4v4H3zM17 17h4v4h-4z" />
      <path d="M7.5 10.5l1.5-1.5M12 6l1.5-1.5M13.5 13.5l1.5-1.5" />
    </svg>
  );
}

function LampIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L8 10h8L12 2z" />
      <path d="M8 10h8v2H8z" />
      <path d="M12 12v8" />
      <path d="M9 20h6" />
    </svg>
  );
}

function getIcon(icon: string) {
  switch (icon) {
    case "sofa": return <SofaIcon />;
    case "ruler": return <RulerIcon />;
    case "lamp": return <LampIcon />;
    default: return <SofaIcon />;
  }
}

export default function Services() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-dm-sans text-gold text-xs tracking-[0.3em] uppercase mb-4"
          >
            Our Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cormorant text-cream text-4xl md:text-5xl lg:text-6xl"
          >
            What We Offer
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof CONFIG.services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group bg-[#242424] border border-transparent hover:border-gold p-8 rounded-sm cursor-default
        transition-all duration-300 hover:shadow-[0_20px_60px_rgba(201,169,110,0.1)]"
    >
      <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110 w-fit">
        {getIcon(service.icon)}
      </div>
      <h3 className="font-cormorant text-cream text-2xl md:text-3xl mb-4">
        {service.title}
      </h3>
      <p className="font-dm-sans text-[#a0a0a0] text-sm leading-relaxed">
        {service.description}
      </p>
      <div className="mt-8 w-8 h-px bg-gold transition-all duration-300 group-hover:w-16" />
    </motion.div>
  );
}
