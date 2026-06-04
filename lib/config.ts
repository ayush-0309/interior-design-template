/**
 * ============================================================
 * HOW TO REBRAND THIS TEMPLATE
 * ============================================================
 * 1. Update every field in the CONFIG object below.
 * 2. Replace portfolioImages[].src with your own Unsplash URLs
 *    or local images (place them in /public/images/).
 * 3. Update googleMapsEmbedURL:
 *    → Open Google Maps → Search your address → Share → Embed a map
 *    → Copy the src="..." value from the iframe snippet.
 * 4. Update socialLinks with your real profile URLs.
 * 5. To connect the BookingForm to email:
 *    → Use Formspree: https://formspree.io (free tier available)
 *    → Or use EmailJS: https://www.emailjs.com
 *    → See BookingForm.tsx for integration comment.
 * ============================================================
 */

const CONFIG = {
  businessName: "STUDIO NAME",
  tagline: "Spaces That Tell Your Story",
  whatsappNumber: "919873709574",
  whatsappMessage: "Hello, I am interested in your interior design services",
  email: "hello@studio.com",
  phone: "+1 (234) 567-8900",
  address: "123 Design Street, City, Country",
  workingHours: "Mon–Sat: 9:00 AM – 7:00 PM",
  googleMapsEmbedURL:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.4!3d37.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1234567890",
  socialLinks: {
    instagram: "#",
    pinterest: "#",
    linkedin: "#",
  },
  services: [
    {
      title: "Interior Design",
      description:
        "Full-service residential and commercial design tailored to your lifestyle.",
      icon: "sofa",
    },
    {
      title: "Space Planning",
      description:
        "Optimised layouts for flow, function, and effortless beauty.",
      icon: "ruler",
    },
    {
      title: "Furniture Curation",
      description:
        "Bespoke sourcing of furniture, art, and statement decor pieces.",
      icon: "lamp",
    },
  ],
  stats: [
    { value: "12+", label: "Years Experience" },
    { value: "200+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
  ],
  portfolioImages: [
    {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
      title: "Modern Villa",
      category: "Residential",
    },
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
      title: "Minimalist Loft",
      category: "Residential",
    },
    {
      src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
      title: "Corporate HQ",
      category: "Commercial",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      title: "Luxury Penthouse",
      category: "Residential",
    },
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      title: "Boutique Hotel",
      category: "Hospitality",
    },
    {
      src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800",
      title: "Private Residence",
      category: "Residential",
    },
  ],
  testimonials: [
    {
      name: "Priya Sharma",
      project: "Residential Villa",
      rating: 5,
      text: "Absolutely transformed our home. Every detail was considered with such care and elegance.",
    },
    {
      name: "Rahul Mehta",
      project: "Corporate Office",
      rating: 5,
      text: "Professional, creative, and delivered well beyond our expectations. Highly recommend.",
    },
    {
      name: "Ananya Kapoor",
      project: "Luxury Apartment",
      rating: 5,
      text: "Working with this studio was a dream. The space feels like us — only better.",
    },
  ],
};

export const getWhatsAppURL = (message = CONFIG.whatsappMessage) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

export default CONFIG;
