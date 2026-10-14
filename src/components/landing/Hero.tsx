"use client";

import Link from "next/link";
import { useRef } from "react";

import { heroFilm } from "@/content/media";
import { DEMO_SLUG } from "@/content/weddings";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

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
        <p className={`eyebrow ${styles.heroKicker}`}>EverTold — a wedding website studio</p>

        <div className={styles.heroMarkWrap} data-hero-mark aria-hidden>
          <div className={styles.wordmark}>
            {"EVERTOLD".split("").map((ch, i) => (
              <span key={i} className={styles.letterMask}>
                <span className={styles.letter} style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div data-hero-foot>
          <div className={styles.heroFoot}>
            <div className={styles.heroPitch}>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span className="visually-hidden">EverTold — </span>We make wedding websites.
              </h1>
              <p className={styles.heroLede}>
                Custom-designed for each couple — your story, every event, RSVPs and an AI concierge that answers your
                guests&apos; questions. All at one beautiful link.
              </p>
            </div>
            <div className={styles.heroCtas}>
              <a href="#inquire" className={styles.pill}>
                Start your website
              </a>
              <Link href={`/w/${DEMO_SLUG}`} className={styles.pillGhost}>
                See an example ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
