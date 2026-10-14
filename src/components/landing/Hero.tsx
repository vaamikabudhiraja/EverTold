"use client";

import { useRef } from "react";

import { heroFilm } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.to("[data-hero-media]", {
          scale: 1.12,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.hero} ref={root} aria-labelledby="hero-title">
      <div className={styles.heroFrame}>
        <div className={styles.heroMedia} data-hero-media>
          <div className={styles.heroMediaIn}>
            <video autoPlay muted loop playsInline preload="auto" poster={heroFilm.poster} aria-hidden>
              <source src={heroFilm.webm} type="video/webm" />
              <source src={heroFilm.mp4} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroPitch}>
          <p className={`eyebrow ${styles.heroKicker}`}>A wedding website studio</p>
          <p className={`neon ${styles.heroSign}`} aria-hidden>
            EverTold
          </p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className="visually-hidden">EverTold — </span>We make wedding websites.
          </h1>
        </div>
        <div className={styles.heroSide}>
          <p className={styles.heroLede}>
            Custom-designed for each couple — your story, every event, RSVPs and an AI concierge that answers your
            guests&apos; questions. All at one beautiful link.
          </p>
          <div className={styles.heroCtas}>
            <a href="#inquire" className={styles.pill}>
              Start your website
            </a>
            <a href="#concierge" className={styles.pillGhost}>
              Ask our concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
