"use client";

import type { Wedding } from "@/content/weddings/types";
import { eventIcs } from "@/lib/ics";

export function AddToCalendar({ wedding, eventId }: { wedding: Wedding; eventId: string }) {
  function download() {
    const event = wedding.events.find((e) => e.id === eventId);
    if (!event) return;
    const blob = new Blob([eventIcs(wedding, event, window.location.href.split("#")[0])], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${wedding.slug}-${event.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <button type="button" onClick={download}>
      Add to calendar
    </button>
  );
}
