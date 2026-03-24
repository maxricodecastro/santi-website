# santi-website

Portfolio/musician website for Santiago. Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Tech stack

| Layer      | Tool                  |
|------------|-----------------------|
| Framework  | Next.js 16 (App Router) |
| UI         | React 19              |
| Styling    | Tailwind CSS v4 + PostCSS |
| Animations | Framer Motion 12      |
| Font       | Geist Sans (via `geist` package) |
| Language   | TypeScript 5          |

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout — applies Geist font, global styles
│   ├── page.tsx          # Home page — composes all sections top to bottom
│   └── globals.css       # Global styles + custom animations (fade-in, spin-slow)
└── components/
    ├── Hero.tsx           # Full-height hero with animated "SANTIAGO" text reveal
    ├── About.tsx          # About section + auto-scrolling gallery + stats (50M+ streams, etc.)
    ├── Gallery.tsx        # Horizontal auto-scroll carousel, pauses on hover/touch
    ├── GalleryImage.tsx   # Single gallery image with blur/brightness hover effect
    ├── Work.tsx           # Simulated music player + album carousel with CD spin animation
    ├── AlbumCard.tsx      # Reusable CD/vinyl card with glossy overlay
    └── Contact.tsx        # Contact links (Soundcloud, IG, TikTok, YouTube, email) + polaroid gallery

public/
├── Knossos.JPG            # Hero image (reused across sections as placeholder)
└── cd.webp                # CD disc image used in AlbumCard
```

## How the page works

`page.tsx` renders four sections in order:

1. **Hero** — split layout with image + animated headline. "SANTIAGO" letters slide in one by one on mount. Nav links at top (WORK, CONTACT, SOUNDCLOUD).
2. **About** — description text, a `Gallery` carousel that auto-scrolls infinitely, and three stat counters.
3. **Work** — dark-themed section. Fake audio player with play/pause, progress bar, and album art. Three album cards in a horizontal carousel. CD spins when "playing". Links to Spotify/Apple Music/YouTube.
4. **Contact** — social links + six polaroid-style image cards with rotation and hover-lift animations.

All sections are responsive (mobile-first, `lg:` breakpoint at 1024px).

## Key patterns

- **Client vs Server components**: `Hero`, `Gallery`, `Work`, and `Contact` use `"use client"` for interactivity. `About`, `page.tsx`, and `layout.tsx` are server components.
- **Animations**: Framer Motion handles mount/scroll animations. Two custom CSS animations in `globals.css`: `.animate-fade-in` (scale+opacity) and `.animate-spin-slow` (6s rotation for the CD).
- **Placeholder content**: All images currently use `Knossos.JPG` and `cd.webp` as placeholders. Album names are "Album One/Two/Three". Stats and copy are placeholder text — replace with real content.
- **No backend/API routes**: This is a static frontend. No database, no auth, no server actions.

## Scripts

```bash
npm run dev    # Dev server with hot reload
npm run build  # Production build
npm start      # Serve production build
npm run lint   # ESLint
```

## Next steps — Vercel hosting

1. Push this repo to GitHub (done).
2. Go to [vercel.com/new](https://vercel.com/new), import the GitHub repo.
3. Vercel auto-detects Next.js — no config needed. Click Deploy.
4. After deploy, connect a custom domain in Vercel dashboard → Settings → Domains.

### Things to do before/after deploy

- [ ] Replace placeholder images (`Knossos.JPG`) with real photos
- [ ] Update album names, descriptions, and streaming links in `Work.tsx`
- [ ] Update stats in `About.tsx` with real numbers
- [ ] Update social links in `Contact.tsx` with real URLs
- [ ] Update the headline text in `Hero.tsx`
- [ ] Optimize `Knossos.JPG` (currently 7.3 MB) — compress or convert to WebP
- [ ] Add a favicon and OG meta tags in `layout.tsx`
