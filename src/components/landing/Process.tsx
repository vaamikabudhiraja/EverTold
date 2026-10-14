"use client";

import { useRef } from "react";

import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

const steps = [
  {
    title: "Discovery call",
    body: "We learn your story, your weekend and your guests. Bring the mood board — we'll bring the questions.",
  },
  {
    title: "Your story, gathered",
    body: "One simple questionnaire becomes your Wedding Vault: events, venues, travel, FAQs and photos. We do the chasing.",
  },
  {
    title: "Design & build",
    body: "A site that feels like your wedding — your palette, your type, your rhythm — with a concierge trained on every detail.",
  },
  {
    title: "Launch & guest care",
    body: "Share one link. RSVPs flow in, questions get answered, and we keep everything current until the last song — and after.",
  },
];

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
          comes together
        </h2>
        <p>
          Discovery to launch in four unhurried steps — then we stay on call, so every guest question has an answer.
        </p>
        <span className="eyebrow">(06) — 01 / 04</span>
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
