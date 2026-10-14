"use client";

import { useRef } from "react";

import { steps } from "@/content/studio";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from("[data-step]", {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%" },
        });
        gsap.from("[data-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          stagger: 0.12,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.process} ref={root} id="process" aria-labelledby="process-title">
      <div className={styles.processHead}>
        <h2 id="process-title" className={styles.processTitle}>
          How it
          <br />
          works
        </h2>
        <p>
          From the first chat to launch day in four steps — and your site keeps working for your guests from then on.
        </p>
        <span className="eyebrow">(05) — 01 / 04</span>
      </div>

      <ol className={styles.steps} data-steps>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step} data-step>
            <span className={styles.rule} data-rule aria-hidden />
            <span className={styles.stepNum}>0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
