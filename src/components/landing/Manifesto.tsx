"use client";

import Image from "next/image";
import { useRef } from "react";

import { photos } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

const statement =
  "A wedding isn't a date on a card. It's a story — and your guests deserve to step inside it. We design wedding websites that hold every detail, answer every question, and make the day feel like it has already begun.";

const promises = [
  "One link for every guest",
  "RSVPs that count themselves",
  "A concierge that never sleeps",
  "Every detail, kept forever",
];

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from("[data-fig]", {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-fig]", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.manifesto} ref={root} aria-label="About the studio">
      <p className={`eyebrow ${styles.sectionIndex}`}>(01) — The studio</p>
      <p className={styles.statement} data-statement>
        {statement.split(" ").map((w, i) => (
          <span key={i} data-word>
            {w}{" "}
          </span>
        ))}
      </p>

      <div className={styles.manifestoFoot}>
        <ol className={styles.promises}>
          {promises.map((p, i) => (
            <li key={p}>
              <span>0{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
        <figure className={styles.manifestoFig}>
          <figcaption className="eyebrow">
            <span>Every couple tells it differently</span>
            <a href="#demo">See a demo</a>
          </figcaption>
          <div className={styles.manifestoImg} data-fig>
            <Image src={photos.piggyback.src} alt={photos.piggyback.alt} fill sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
        </figure>
      </div>
    </section>
  );
}
