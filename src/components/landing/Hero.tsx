"use client";

import { useRef } from "react";

import { heroFilm } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

const services = ["Story sites", "RSVP & guest list", "AI concierge", "Wedding vault"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-media]", { scale: 1.14, yPercent: 8, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-mark]", { yPercent: -40, opacity: 0.15, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-hero-foot]", { y: -60, opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "40% top" } });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.hero} ref={root} aria-labelledby="hero-title">
      <div className={styles.heroMedia} data-hero-media>
        <div className={styles.heroMediaIn}>
          <video autoPlay muted loop playsInline preload="auto" poster={heroFilm.poster} aria-hidden>
            <source src={heroFilm.webm} type="video/webm" />
            <source src={heroFilm.mp4} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={styles.heroShade} aria-hidden />

      <div className={styles.heroInner}>
        <p className={`eyebrow ${styles.heroKicker}`}>Wedding websites · RSVP · AI concierge</p>

        <div className={styles.heroMarkWrap} data-hero-mark>
          <h1 id="hero-title" className={styles.wordmark} aria-label="EverTold">
            {"EVERTOLD".split("").map((ch, i) => (
              <span key={i} className={styles.letterMask} aria-hidden>
                <span className={styles.letter} style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
          </h1>
          <ul className={styles.heroServices}>
            {services.map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div data-hero-foot>
          <div className={styles.heroFoot}>
            <p className={styles.heroLede}>
              A studio crafting immersive wedding websites — one link for your story, every event, every RSVP and every
              question your guests will ask.
            </p>
            <a href="#inquire" className={styles.pill}>
              Plan your site
            </a>
            <span className={`eyebrow ${styles.scrollCue}`}>(Scroll down)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
