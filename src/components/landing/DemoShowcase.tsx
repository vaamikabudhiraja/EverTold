"use client";

import Link from "next/link";
import { useRef } from "react";

import { heroFilm } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

type Props = { slug: string; names: [string, string]; dateLabel: string; place: string; eventCount: number };

export function DemoShowcase({ slug, names, dateLabel, place, eventCount }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.fromTo(
          "[data-phone]",
          { yPercent: 18, rotate: -4 },
          {
            yPercent: -8,
            rotate: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-showcase-bg]",
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.showcase} ref={root} id="demo" aria-labelledby="demo-title">
      <div className={styles.showcaseHead}>
        <h2 id="demo-title" className={styles.showcaseTitle}>
          Step inside
          <br />a wedding
        </h2>
        <p>
          A complete EverTold site for a fictional couple — five events across three days, per-event RSVPs, travel and
          stays, and a concierge you can talk to.
        </p>
        <Link href={`/w/${slug}`} className={styles.textLink}>
          Open the demo ↗
        </Link>
      </div>

      <Link
        href={`/w/${slug}`}
        className={styles.showcaseStage}
        aria-label={`Open the demo wedding site for ${names[0]} and ${names[1]}`}
      >
        <div className={styles.showcaseBg} data-showcase-bg aria-hidden>
          <video autoPlay muted loop playsInline poster={heroFilm.poster}>
            <source src={heroFilm.webm} type="video/webm" />
            <source src={heroFilm.mp4} type="video/mp4" />
          </video>
        </div>

        <div className={styles.phone} data-phone aria-hidden>
          <div className={styles.phoneScreen}>
            <video autoPlay muted loop playsInline poster={heroFilm.poster}>
              <source src={heroFilm.webm} type="video/webm" />
              <source src={heroFilm.mp4} type="video/mp4" />
            </video>
            <div className={styles.phoneUi}>
              <span className="eyebrow">{dateLabel}</span>
              <p className={styles.phoneNames}>
                {names[0]}
                <em>&amp;</em>
                {names[1]}
              </p>
              <span className={styles.phoneBtn}>RSVP</span>
            </div>
          </div>
        </div>

        <div className={styles.showcaseMeta}>
          <p className={styles.showcaseName}>
            {names[0]} &amp; {names[1]}
          </p>
          <p className="eyebrow">
            {place} · {eventCount} events · RSVP · Concierge
          </p>
        </div>
        <span className={`eyebrow ${styles.showcaseCta}`}>View site ↗</span>
      </Link>
    </section>
  );
}
