"use client";

import { useRef } from "react";

import { NeonSign } from "@/components/NeonSign";
import { heroFilm } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

/**
 * The first screen is the film alone. It stays pinned while the pitch slides
 * up over it on the first scroll.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const scrub = { trigger: "[data-intro]", start: "top bottom", end: "top top", scrub: true };
        gsap.to("[data-hero-media]", { scale: 1.1, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-scroll-cue]", {
          opacity: 0,
          y: 20,
          ease: "none",
          scrollTrigger: { ...scrub, end: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div className={styles.heroWrap} ref={root}>
      <section className={styles.hero} aria-label="EverTold film">
        <div className={styles.heroMedia} data-hero-media>
          <div className={styles.heroMediaIn}>
            <video autoPlay muted loop playsInline preload="auto" poster={heroFilm.poster} aria-hidden>
              <source src={heroFilm.webm} type="video/webm" />
              <source src={heroFilm.mp4} type="video/mp4" />
            </video>
          </div>
        </div>

        <a href="#intro" className={styles.scrollCue} data-scroll-cue>
          <span className={styles.scrollCueIn}>
            Scroll
            <span className={styles.scrollLine} aria-hidden />
          </span>
        </a>
      </section>

      <section className={styles.intro} id="intro" data-intro aria-labelledby="hero-title">
        <div className={styles.introInner}>
          <p className={`eyebrow ${styles.introKicker}`}>A wedding website studio</p>
          <NeonSign className={styles.introSign}>EverTold</NeonSign>
          <h1 id="hero-title" className={styles.introTitle}>
            <span className="visually-hidden">EverTold — </span>We make wedding websites.
          </h1>
          <p className={styles.introLede}>
            Custom-designed for each couple — your story, every event, RSVPs and an AI concierge that answers your
            guests&apos; questions. All at one beautiful link.
          </p>
          <div className={styles.introCtas}>
            <a href="#inquire" className={styles.pill}>
              Start your website
            </a>
            <a href="#concierge" className={styles.pillGhost}>
              Ask our concierge
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
