import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import type { Wedding } from "@/content/weddings/types";
import type { RsvpRecord } from "./records";
import { readAll } from "./store";

export type Access = "ok" | "denied" | "disabled";

/**
 * Guest lists are protected by EVERTOLD_ADMIN_KEY. Without it, the guest list
 * is open in development (so you can try it) and switched off in production.
 */
export function checkAccess(key: string | null | undefined): Access {
  const secret = process.env.EVERTOLD_ADMIN_KEY;
  if (!secret) return process.env.NODE_ENV === "development" ? "ok" : "disabled";
  if (!key) return "denied";
  const digest = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(digest(key), digest(secret)) ? "ok" : "denied";
}

export async function guestList(w: Wedding) {
  const rows = (await readAll<RsvpRecord>("rsvps"))
    .filter((r) => r.slug === w.slug)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const attending = rows.filter((r) => r.attending);
  const perEvent = w.events.map((e) => ({
    id: e.id,
    name: e.name,
    guests: attending.filter((r) => r.events.includes(e.id)).reduce((n, r) => n + r.partySize, 0),
  }));
  return {
    rows,
    responses: rows.length,
    attendingParties: attending.length,
    declined: rows.length - attending.length,
    headcount: attending.reduce((n, r) => n + r.partySize, 0),
    perEvent,
    diets: attending.filter((r) => r.diet).map((r) => ({ name: r.name, diet: r.diet })),
    songs: attending.filter((r) => r.song).map((r) => ({ name: r.name, song: r.song })),
  };
}

export function toCsv(w: Wedding, rows: RsvpRecord[]) {
  const cell = (v: string | number | boolean) => `"${String(v).replace(/"/g, '""')}"`;
  const header = [
    "Name",
    "Email",
    "Attending",
    "Party size",
    "Guests",
    ...w.events.map((e) => e.name),
    "Dietary",
    "Song",
    "Message",
    "Updated",
  ];
  const lines = rows.map((r) =>
    [
      r.name,
      r.email,
      r.attending ? "Yes" : "No",
      r.partySize,
      r.guests.join("; "),
      ...w.events.map((e) => (r.events.includes(e.id) ? "Yes" : "")),
      r.diet,
      r.song,
      r.message,
      r.updatedAt,
    ]
      .map(cell)
      .join(","),
  );
  return [header.map(cell).join(","), ...lines].join("\r\n");
}
