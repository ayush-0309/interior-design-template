"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CONFIG, { getWhatsAppURL } from "@/lib/config";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800"
          alt="Luxury interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      {/* Extra left vignette for text legibility */}
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-dm-sans text-gold tracking-[0.3em] text-xs uppercase mb-6"
          >
            Luxury Interior Design Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-cormorant italic text-cream text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
          >
            {CONFIG.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-dm-sans text-cream/80 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            We craft interiors that transcend the ordinary — blending timeless
            elegance with your unique vision to create spaces you will love
            forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex flex-col gap-3"
          >
            {/* Row 1: Book + Call */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("booking")}
                className="font-dm-sans bg-gold text-dark px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#b8935a] transition-all duration-300 min-h-[44px]"
              >
                Book a Consultation
              </button>
              <a
                href={`tel:${CONFIG.phone}`}
                className="font-dm-sans flex items-center justify-center gap-2 border border-cream/60 text-cream px-8 py-4 text-sm tracking-widest uppercase hover:bg-cream/10 transition-all duration-300 min-h-[44px]"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Us Now
              </a>
            </div>

            {/* Row 2: View Work */}
            <button
              onClick={() => scrollTo("portfolio")}
              className="font-dm-sans border border-cream text-cream px-8 py-4 text-sm tracking-widest uppercase hover:bg-cream hover:text-dark transition-all duration-300 min-h-[44px] sm:w-fit"
            >
              View Our Work
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-dm-sans text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Mobile-only WhatsApp FAB */}
      <MobileWhatsApp />
    </section>
  );
}

function MobileWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppURL()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.92 }}
      className="md:hidden fixed bottom-6 right-5 z-40 w-13 h-13
        bg-[#25D366] text-white rounded-full shadow-lg shadow-black/25
        flex items-center justify-center"
      style={{ width: 52, height: 52 }}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}
