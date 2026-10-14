# EverTold

A studio site for **EverTold** — immersive wedding websites with RSVPs, a wedding vault and an AI concierge — plus a complete demo wedding site that shows couples exactly what they get.

| Route | What it is |
| --- | --- |
| `/` | The EverTold studio landing page (scroll-told, cinematic) |
| `/w/anaya-and-kabir` | Demo wedding site: story, five-event schedule, travel, FAQ, RSVP, concierge |
| `/w/<slug>/guests` | The couple's private guest list: headcounts, dietary notes, songs, CSV export |
| `/api/concierge` | Streams concierge answers (Claude), grounded in the couple's wedding details |
| `/api/rsvp` | Saves or updates an RSVP |
| `/api/inquiry` | Saves an inquiry from the studio contact form |

## Running it

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Environment

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Turns on the live AI concierge. Without it the concierge answers from the wedding details using simple keyword matching, so the demo still works. |
| `CONCIERGE_MODEL` | Optional model override. Defaults to `claude-opus-5-5`. |
| `EVERTOLD_ADMIN_KEY` | Protects guest lists. Open `/w/<slug>/guests?key=<value>`. Without it, guest lists are open in development and switched off in production. |
| `EVERTOLD_DATA_DIR` | Where RSVPs and inquiries are stored (default `./.data`). |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for social previews. |

## Adding a couple

Each wedding is one file, the "wedding vault":

1. Copy `src/content/weddings/anaya-and-kabir.ts` to a new file and fill it in — names, events, travel, stays, FAQs, photos, theme colours.
2. Register it in `src/content/weddings/index.ts`.
3. It's live at `/w/<slug>`. The schedule, RSVP form and concierge all read from that one file, so updating it updates everything.

## Swapping media

- **Landing film:** `public/media/hero-beach.{mp4,webm}` with `hero-beach-poster.jpg`. Run `scripts/encode-film.sh your-clip.mp4` (needs ffmpeg) to produce a seamless, muted loop in all three formats.
- **Photos:** drop files into `public/photos/` and update `src/content/media.ts`. The current photos are stand-ins cropped from the hero film; keep the same file names to replace them in place.

## Before going live

- **Storage:** RSVPs and inquiries are written to JSON files. That's fine on a single server with a persistent disk, but serverless hosts (e.g. Vercel) wipe the filesystem, so swap `src/lib/store.ts` for a database first.
- **Rate limiting** is in-memory per server instance; use a shared store if you scale out.
- Update `src/content/site.ts` with your real email and Instagram.

## Stack

Next.js 16 (App Router, Cache Components), React 19, GSAP ScrollTrigger + Lenis for scroll animation, the Anthropic TypeScript SDK for the concierge, and Zod for input validation.
