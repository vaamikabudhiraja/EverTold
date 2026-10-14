"use client";

import { useRef } from "react";

import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

const chips = [
  { label: "RSVP", text: "Every reply, counted live", color: "var(--red)", ink: "var(--ivory)", width: "78%" },
  { label: "Schedule", text: "Every event, one timeline", color: "var(--amber)", ink: "var(--ink)", width: "62%" },
  {
    label: "Concierge",
    text: "Every question, answered 24/7",
    color: "var(--jade)",
    ink: "var(--ivory)",
    width: "92%",
  },
  {
    label: "Updates",
    text: "Every change, shared instantly",
    color: "var(--oxblood)",
    ink: "var(--ivory)",
    width: "70%",
  },
];

const stats = [
  { value: "1", label: "Link for every guest" },
  { value: "24/7", label: "Concierge on call" },
  { value: "0", label: "Reprints when plans change" },
];

export function OneLink() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from("[data-chip]", {
          scaleX: 0,
          transformOrigin: "left center",
          stagger: 0.12,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-chips]", start: "top 75%" },
        });
        gsap.from("[data-chip-text]", {
          opacity: 0,
          x: -16,
          stagger: 0.12,
          delay: 0.45,
          duration: 0.6,
          scrollTrigger: { trigger: "[data-chips]", start: "top 75%" },
        });
        gsap.from("[data-stat]", {
          yPercent: 100,
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-stats]", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.onelink} ref={root} aria-labelledby="onelink-title">
      <div className={styles.onelinkTop}>
        <h2 id="onelink-title" className={`display ${styles.onelinkTitle}`}>
          One link.
          <br />
          Every answer.
        </h2>
        <div className={styles.onelinkIntro}>
          <p className="eyebrow">(03) — For your guests</p>
          <p>
            Save-the-dates, schedules, maps, dress codes, RSVPs — and the questions that would otherwise flood your
            group chat. Gathered into one place your guests actually enjoy visiting.
          </p>
        </div>
      </div>

      <div className={styles.onelinkBody}>
        <div className={styles.chips} data-chips>
          {chips.map((c) => (
            <div key={c.label} className={styles.chipRow}>
              <p className="eyebrow">{c.label}</p>
              <span className={styles.chip} style={{ background: c.color, color: c.ink, width: c.width }} data-chip>
                <span data-chip-text>{c.text}</span>
              </span>
            </div>
          ))}
        </div>
        <dl className={styles.stats} data-stats>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className="eyebrow">{s.label}</dt>
              <dd className="display">
                <span data-stat>{s.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
