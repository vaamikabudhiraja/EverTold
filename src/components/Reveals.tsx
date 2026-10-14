"use client";

import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Fades up every [data-reveal] element on the page as it scrolls into view. */
export function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION.motion, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { opacity: 0, y: 40 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        // Jumping down the page (anchor links) enters many elements at once; cap the
        // total stagger so the ones in view don't wait behind those scrolled past.
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: { amount: Math.min(0.4, batch.length * 0.1) },
            duration: 1,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    });
  });
  return null;
}
