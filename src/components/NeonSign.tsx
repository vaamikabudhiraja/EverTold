"use client";

import { useRef } from "react";

import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Props = { children: React.ReactNode; className?: string };

/**
 * Neon lettering that stays switched off until it scrolls into view, then
 * stutters on like the OPEN sign in the film (see `.neon` in globals.css).
 */
export function NeonSign({ children, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION.motion, () => {
      el.style.animationPlayState = "paused, paused";
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          el.style.animationDelay = "0.2s, 2.4s";
          el.style.animationPlayState = "running, running";
        },
      });
      return () => trigger.kill();
    });
  });

  return (
    <p ref={ref} className={`neon ${className ?? ""}`} aria-hidden>
      {children}
    </p>
  );
}
