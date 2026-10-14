"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";

import { heroFilm, photos, type Photo } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

type Segment = string | { photo: Photo } | { film: true };

type Panel = {
  eyebrow: string;
  lines: Segment[][];
  note: string;
  bg: string;
  ink: string;
};

const panels: Panel[] = [
  {
    eyebrow: "RSVPs",
    lines: [
      [{ photo: photos.noodles }, "If they're coming"],
      ["you'll know", { film: true }],
      [{ photo: photos.kiss }, "the second they say yes"],
    ],
    note: "Per-event RSVPs land in a live guest list — headcounts, plus-ones and dietary notes included.",
    bg: "var(--coral)",
    ink: "var(--ink)",
  },
  {
    eyebrow: "AI concierge",
    lines: [
      [{ photo: photos.spaghetti }, "If they're lost"],
      ["the concierge", { photo: photos.doorstep }],
      [{ film: true }, "will find them"],
    ],
    note: "An AI concierge that has read every detail of your wedding — and answers at 2am, in your tone.",
    bg: "var(--lilac)",
    ink: "var(--ink)",
  },
  {
    eyebrow: "Live updates",
    lines: [
      [{ photo: photos.piggyback }, "If plans change"],
      ["every guest", { photo: photos.noodles }],
      [{ photo: photos.kiss }, "hears it first"],
    ],
    note: "Edit once. The site, the schedule and the concierge update together — no reprints, no reply-all.",
    bg: "var(--teal)",
    ink: "var(--ivory)",
  },
];

function Inline({ segment }: { segment: Segment }) {
  if (typeof segment === "string") return <>{segment}</>;
  if ("film" in segment) {
    return (
      <span className={styles.inlineMedia} aria-hidden>
        <video autoPlay muted loop playsInline poster={heroFilm.poster}>
          <source src={heroFilm.webm} type="video/webm" />
          <source src={heroFilm.mp4} type="video/mp4" />
        </video>
      </span>
    );
  }
  return (
    <span className={styles.inlineMedia} aria-hidden>
      <Image src={segment.photo.src} alt="" fill sizes="20vw" />
    </span>
  );
}

export function ColorStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-line]"), {
            yPercent: 110,
            stagger: 0.09,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: panel, start: "top 55%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.colorStory} ref={root} aria-label="What your website does">
      {panels.map((p) => (
        <div key={p.eyebrow} className={styles.panel} style={{ background: p.bg, color: p.ink }} data-panel>
          <div className={styles.panelInner}>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className={`display ${styles.panelTitle}`}>
              {p.lines.map((line, i) => (
                <span key={i} className={styles.lineMask}>
                  <span className={styles.line} data-line>
                    {line.map((seg, j) => (
                      <Fragment key={j}>
                        <Inline segment={seg} />
                      </Fragment>
                    ))}
                  </span>
                </span>
              ))}
            </h2>
            <p className={styles.panelNote}>{p.note}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
