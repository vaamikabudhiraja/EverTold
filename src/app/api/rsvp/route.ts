import { z } from "zod";

import { getWedding } from "@/content/weddings";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { RsvpRecord } from "@/lib/records";
import { mutate } from "@/lib/store";

/** Optional free text: missing, null or blank all become "". */
const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => v ?? "");

const Body = z.object({
  slug: z.string().min(1).max(80),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  attending: z.boolean(),
  events: z.array(z.string().max(40)).max(20).default([]),
  partySize: z.number().int().min(1).max(12).default(1),
  guests: z.array(z.string().trim().max(120)).max(11).default([]),
  diet: text(500),
  song: text(200),
  message: text(2000),
  // Honeypot: real guests never see or fill this field.
  website: z.string().max(0).nullish(),
});

export async function POST(request: Request) {
  if (!rateLimit(`rsvp:${clientIp(request)}`, 10, 60_000)) {
    return Response.json({ ok: false, error: "Too many attempts — please wait a minute." }, { status: 429 });
  }

  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check your name and email and try again." }, { status: 400 });
  }
  const input = parsed.data;

  const wedding = getWedding(input.slug);
  if (!wedding) return Response.json({ ok: false, error: "Unknown wedding." }, { status: 404 });

  const maxParty = wedding.rsvpOptions.maxPartySize;
  const validEvents = new Set(wedding.events.filter((e) => e.rsvp).map((e) => e.id));
  const events = input.attending ? input.events.filter((id) => validEvents.has(id)) : [];
  if (input.attending && events.length === 0) {
    return Response.json({ ok: false, error: "Pick at least one event you can make." }, { status: 400 });
  }
  const partySize = input.attending ? Math.min(input.partySize, maxParty) : 0;

  const now = new Date().toISOString();
  const email = input.email.toLowerCase();
  let updated = false;

  await mutate<RsvpRecord>("rsvps", (rows) => {
    const existing = rows.find((r) => r.slug === input.slug && r.email === email);
    const record: RsvpRecord = {
      id: existing?.id ?? crypto.randomUUID(),
      slug: input.slug,
      name: input.name,
      email,
      attending: input.attending,
      events,
      partySize,
      guests: input.attending ? input.guests.filter(Boolean).slice(0, Math.max(0, partySize - 1)) : [],
      diet: input.diet,
      song: input.song,
      message: input.message,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    updated = Boolean(existing);
    return existing ? rows.map((r) => (r.id === existing.id ? record : r)) : [...rows, record];
  });

  return Response.json({ ok: true, updated });
}
