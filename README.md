# EverTold

The marketing website for **EverTold**, a studio that makes custom wedding websites. It's a scroll-told, cinematic page that tells couples what we make, lets them try an AI concierge, walks through the process and packages, and collects inquiries.

| Route | What it is |
| --- | --- |
| `/` | The EverTold website |
| `/api/concierge` | Streams answers from EverTold's AI concierge (Claude), grounded in the site's own content |
| `/api/inquiry` | Saves an inquiry from the "Get in touch" form |

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
| `ANTHROPIC_API_KEY` | Turns on the live AI concierge. Without it the concierge answers from the site content using simple keyword matching, so the page still works. |
| `CONCIERGE_MODEL` | Optional model override. Defaults to `claude-opus-5-5`. |
| `EVERTOLD_DATA_DIR` | Where inquiries are stored (default `./.data`). |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for social previews. |

## Editing the content

- **Services, packages, process steps and FAQs:** `src/content/studio.ts`. The page sections render from this file and the concierge answers from it, so one edit updates both.
- **Email, Instagram and the one-line description:** `src/content/site.ts`.
- **Landing film:** `public/media/hero-beach.{mp4,webm}` with `hero-beach-poster.jpg`. Run `scripts/encode-film.sh your-clip.mp4` (needs ffmpeg) to produce a seamless, muted loop in all three formats.
- **Photos:** drop files into `public/photos/` and update `src/content/media.ts`. The current photos are stand-ins cropped from the hero film; keep the same file names to replace them in place.

## Before going live

- **Storage:** inquiries are written to a JSON file. That's fine on a single server with a persistent disk, but serverless hosts (e.g. Vercel) wipe the filesystem, so send them to a database or an email service first.
- **Rate limiting** is in-memory per server instance; use a shared store if you scale out.

## Stack

Next.js 16 (App Router, Cache Components), React 19, GSAP ScrollTrigger + Lenis for scroll animation, the Anthropic TypeScript SDK for the concierge, and Zod for input validation.
