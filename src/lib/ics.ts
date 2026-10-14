import type { Wedding, WeddingEvent } from "@/content/weddings/types";

/** Builds an .ics calendar file for one wedding event. */

function stamp(iso: string) {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escape(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/([,;])/g, "\\$1");
}

export function eventIcs(w: Wedding, e: WeddingEvent, siteUrl: string) {
  const title = `${e.name} — ${w.couple.first} & ${w.couple.second}`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EverTold//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${w.slug}-${e.id}@evertold`,
    `DTSTAMP:${stamp(e.start)}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:${escape(title)}`,
    `LOCATION:${escape(`${e.venue}, ${e.address}`)}`,
    `DESCRIPTION:${escape(`${e.description}\n\nDress code: ${e.dressCode}\n${siteUrl}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
