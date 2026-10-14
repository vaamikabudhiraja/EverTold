"use client";

import { useEffect, useState } from "react";

import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import styles from "./wedding.module.css";

const OPEN_EVENT = "evertold:open-concierge";

export function OpenConciergeButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  );
}

type Props = { slug: string; coupleNames: string; suggestions: string[] };

export function ConciergeWidget({ slug, coupleNames, suggestions }: Props) {
  const [open, setOpen] = useState(false);
  // The hero has its own RSVP call to action; the button appears once guests scroll into the content.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`${styles.fab} ${open || !pastHero ? styles.fabHidden : ""}`}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="concierge-panel"
      >
        <span className={styles.fabDot} aria-hidden />
        Ask the concierge
      </button>

      <div
        id="concierge-panel"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-label="Wedding concierge"
        aria-modal="false"
        hidden={!open}
      >
        <button
          type="button"
          className={styles.drawerClose}
          onClick={() => setOpen(false)}
          aria-label="Close concierge"
        >
          ×
        </button>
        {open && <ConciergeChat slug={slug} coupleNames={coupleNames} suggestions={suggestions} tone="light" compact />}
      </div>
    </>
  );
}
