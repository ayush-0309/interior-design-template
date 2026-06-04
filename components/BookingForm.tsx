"use client";

/**
 * To connect this form to email:
 * - Formspree (recommended): https://formspree.io — create a free form,
 *   then replace the fetch URL below with your Formspree endpoint.
 * - EmailJS: https://www.emailjs.com — install `@emailjs/browser` and
 *   call emailjs.sendForm() in handleSubmit instead of the fetch call.
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CONFIG from "@/lib/config";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  message: "",
};

export default function BookingForm() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const required: (keyof FormData)[] = ["name", "email", "phone", "date", "time", "service"];

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    required.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Replace with your Formspree endpoint URL:
    // await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
    setSubmitted(true);
    setForm(EMPTY_FORM);
  };

  return (
    <>
      <section id="booking" className="section-padding bg-cream">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-dm-sans text-gold text-xs tracking-[0.3em] uppercase mb-4"
            >
              Let&apos;s Begin
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant text-dark text-4xl md:text-5xl lg:text-6xl"
            >
              Book a Consultation
            </motion.h2>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >
            {/* Name */}
            <FloatingInput
              label="Full Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            {/* Email */}
            <FloatingInput
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* Phone */}
            <FloatingInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            {/* Date */}
            <FloatingInput
              label="Preferred Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              error={errors.date}
            />

            {/* Time */}
            <FloatingSelect
              label="Preferred Time"
              name="time"
              value={form.time}
              onChange={handleChange}
              error={errors.time}
              options={[
                { value: "morning", label: "Morning (9:00 AM – 12:00 PM)" },
                { value: "afternoon", label: "Afternoon (12:00 PM – 5:00 PM)" },
                { value: "evening", label: "Evening (5:00 PM – 7:00 PM)" },
              ]}
            />

            {/* Service */}
            <FloatingSelect
              label="Service Interested In"
              name="service"
              value={form.service}
              onChange={handleChange}
              error={errors.service}
              options={CONFIG.services.map((s) => ({ value: s.title, label: s.title }))}
            />

            {/* Message */}
            <FloatingTextarea
              label="Message / Notes (optional)"
              name="message"
              value={form.message}
              onChange={handleChange}
              error={errors.message}
            />

            <button
              type="submit"
              className="w-full bg-gold text-dark font-cormorant text-lg tracking-wider py-4 hover:bg-[#b8935a] transition-colors duration-300 min-h-[52px]"
            >
              Send Enquiry
            </button>
          </motion.form>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 rounded-sm text-center max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-cormorant text-dark text-3xl mb-3">Thank You!</h3>
              <p className="font-dm-sans text-brand-gray text-sm leading-relaxed mb-6">
                Your consultation request has been received. We&apos;ll reach out within 24 hours to confirm your appointment.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="font-dm-sans text-sm tracking-wider uppercase text-gold border border-gold px-6 py-3 hover:bg-gold hover:text-dark transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Field sub-components ──────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
}

function FloatingInput({ label, name, type, value, onChange, error }: FieldProps & { type: string }) {
  return (
    <div>
      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={error ? "border-b-red-400" : ""}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <p className="font-dm-sans text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FloatingSelect({
  label,
  name,
  value,
  onChange,
  error,
  options,
}: FieldProps & { options: { value: string; label: string }[] }) {
  return (
    <div>
      <div className="input-wrapper">
        <select id={name} name={name} value={value} onChange={onChange} required>
          <option value="" disabled hidden></option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <p className="font-dm-sans text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange, error }: FieldProps) {
  return (
    <div>
      <div className="input-wrapper">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder=" "
          className="resize-none"
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <p className="font-dm-sans text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
