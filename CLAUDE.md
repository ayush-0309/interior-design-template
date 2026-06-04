# Interior Design Website Template

A production-ready, fully responsive interior design business website built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom brand tokens
- **Animation**: Framer Motion (scroll-triggered, hover, page transitions)
- **Fonts**: Cormorant Garamond (headings) + DM Sans (body) via `next/font/google`
- **Images**: `next/image` with Unsplash remote patterns configured

## Project Structure

```
/app
  layout.tsx        — fonts, metadata, global WhatsApp button
  page.tsx          — imports and renders all sections in order
  globals.css       — Tailwind directives, CSS variables, global resets, scrollbar, floating labels

/components
  Navbar.tsx        — fixed, scroll-aware, mobile hamburger menu
  Hero.tsx          — full-viewport, parallax-style image, CTA buttons
  About.tsx         — two-column, stats row with stagger animation
  Services.tsx      — dark bg, 3-column card grid with hover lift
  Portfolio.tsx     — masonry grid, hover overlay, opens Lightbox
  Lightbox.tsx      — full-screen image viewer, keyboard nav (arrows + Escape)
  Testimonials.tsx  — auto-advancing carousel, dot navigation
  BookingForm.tsx   — floating label form, inline validation, success modal
  MapLocation.tsx   — two-column with Google Maps iframe
  WhatsAppButton.tsx — fixed floating button, left side, vertically centered
  Footer.tsx        — dark, gold border, social links, nav links

/lib
  config.ts         — single source of truth for all business data
```

## How to Rebrand

All business data lives in **`/lib/config.ts`**. Update that file:

1. `businessName`, `tagline`, `email`, `phone`, `address`, `workingHours`
2. `whatsappNumber` — digits only, no `+` or spaces
3. `googleMapsEmbedURL` — get from Google Maps → Share → Embed a map → copy `src="..."`
4. `socialLinks` — replace `#` with real URLs
5. `portfolioImages` — replace Unsplash URLs with your own (or local paths under `/public`)
6. `services`, `stats`, `testimonials` — update copy as needed

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run start
```

## Connecting the Booking Form

The form in `BookingForm.tsx` is UI-only. To receive submissions:

- **Formspree** (easiest): create a free form at https://formspree.io, then replace the commented `fetch` call in `handleSubmit` with your endpoint URL.
- **EmailJS**: install `@emailjs/browser` and call `emailjs.sendForm()` in `handleSubmit`.

## Environment Variables

Create `.env.local` (already gitignored) for any secrets:

```env
# Example if using EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Design Tokens

Defined as CSS variables in `globals.css` and as Tailwind extensions in `tailwind.config.ts`:

| Token         | Value     | Usage                  |
|---------------|-----------|------------------------|
| `dark`        | `#1a1a1a` | Backgrounds, text      |
| `cream`       | `#f5f0eb` | Page background, light sections |
| `gold`        | `#c9a96e` | Accents, borders, icons |
| `rose`        | `#d4a5a5` | Decorative accents     |
| `brand-gray`  | `#6b6b6b` | Body text, labels      |

## Performance Notes

- Lightbox is dynamically imported (`next/dynamic`) to keep initial bundle small
- All `next/image` components have `fill` with sized parents, or explicit `width`/`height`
- Fonts use `display: "swap"` to eliminate layout shift
- Framer Motion `useInView` with `once: true` avoids re-triggering animations
