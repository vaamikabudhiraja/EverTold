"use client";

import Image from "next/image";
import { useRef } from "react";

import { photos } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

// Thumbnails scattered around the hero photo: position (% of stage), width (vw), tilt.
const thumbs = [
  { p: photos.noodles, l: 13, t: 14, w: 8, r: -5 },
  { p: photos.spaghetti, l: 31, t: 7, w: 9, r: 3 },
  { p: photos.doorstep, l: 68, t: 9, w: 7, r: -2 },
  { p: photos.piggyback, l: 85, t: 27, w: 8.5, r: 4 },
  { p: photos.doorstep, l: 6, t: 50, w: 9, r: 2 },
  { p: photos.piggyback, l: 20, t: 76, w: 7.5, r: -4 },
  { p: photos.noodles, l: 77, t: 66, w: 10, r: -3 },
  { p: photos.spaghetti, l: 58, t: 85, w: 8, r: 2 },
  { p: photos.kiss, l: 38, t: 84, w: 6, r: -2 },
];

export function Scatter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 0.6, pin: "[data-stage]" },
        });
        tl.fromTo(
          "[data-zoom]",
          { clipPath: "inset(30% 39% 30% 39% round 6px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 },
          0,
        )
          .fromTo("[data-zoom-img]", { scale: 1.35 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
          .to(
            "[data-thumb]",
            {
              x: (_, el: HTMLElement) => Number(el.dataset.dx) * window.innerWidth * 0.55,
              y: (_, el: HTMLElement) => Number(el.dataset.dy) * window.innerHeight * 0.55,
              opacity: 0,
              scale: 0.8,
              ease: "power1.in",
              duration: 0.8,
            },
            0,
          )
          .fromTo("[data-scatter-title]", { scale: 0.86 }, { scale: 1, ease: "none", duration: 1 }, 0);

        gsap.from("[data-thumb]", {
          opacity: 0,
          scale: 0.6,
          x: (_, el: HTMLElement) => -Number(el.dataset.dx) * 160,
          y: (_, el: HTMLElement) => -Number(el.dataset.dy) * 160,
          stagger: 0.05,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.scatter} ref={root} aria-labelledby="scatter-title">
      <div className={styles.scatterStage} data-stage>
        {thumbs.map((t, i) => {
          const dx = (t.l - 50) / 50;
          const dy = (t.t - 50) / 50;
          return (
            <div
              key={i}
              className={styles.thumb}
              data-thumb
              data-dx={dx.toFixed(2)}
              data-dy={dy.toFixed(2)}
              style={{ left: `${t.l}%`, top: `${t.t}%`, width: `${t.w}vw`, rotate: `${t.r}deg` }}
            >
              <Image src={t.p.src} alt="" width={t.p.width} height={t.p.height} sizes="12vw" />
            </div>
          );
        })}

        <div className={styles.zoom} data-zoom>
          <div className={styles.zoomImg} data-zoom-img>
            <Image src={photos.kiss.src} alt={photos.kiss.alt} fill sizes="100vw" />
          </div>
        </div>

        <div className={styles.scatterCopy} data-scatter-title>
          <p className="eyebrow">A moment, forever</p>
          <h2 id="scatter-title" className={styles.scatterTitle}>
            Every love story
            <br />
            deserves to be told.
          </h2>
        </div>
      </div>
    </section>
  );
}
