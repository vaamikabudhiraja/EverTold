"use client";

import Image from "next/image";
import { useRef } from "react";

import type { Wedding } from "@/content/weddings/types";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./wedding.module.css";

export function WeddingHero({ wedding: w, children }: { wedding: Wedding; children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-media]", { scale: 1.12, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-names]", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: root },
  );

  const video = w.hero.video;

  return (
    <section className={styles.hero} ref={root} id="top" aria-labelledby="couple-names">
      <div className={styles.heroMedia} data-hero-media>
        <div className={styles.heroMediaIn}>
          {video ? (
            <video autoPlay muted loop playsInline preload="auto" poster={video.poster} aria-hidden>
              {video.webm && <source src={video.webm} type="video/webm" />}
              <source src={video.mp4} type="video/mp4" />
            </video>
          ) : (
            w.hero.photo && <Image src={w.hero.photo.src} alt="" fill priority sizes="100vw" />
          )}
        </div>
      </div>
      <div className={styles.heroShade} aria-hidden />

      <div className={styles.heroContent} data-hero-names>
        <p className={`eyebrow ${styles.heroEyebrow}`}>Together with their families</p>
        <h1 id="couple-names" className={styles.names}>
          <span className={styles.nameLine}>
            <span>{w.couple.first}</span>
          </span>
          <span className={styles.amp}>&amp;</span>
          <span className={styles.nameLine}>
            <span>{w.couple.second}</span>
          </span>
        </h1>
        <p className={styles.heroDate}>
          {w.dateLabel} · {w.location.city}, {w.location.region}
        </p>
      </div>

      <div className={styles.heroBar}>
        {children}
        <a href="#rsvp" className={styles.heroRsvp}>
          RSVP
        </a>
      </div>
    </section>
  );
}
