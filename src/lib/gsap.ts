"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media-query conditions shared by every scroll animation. */
export const MOTION = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 900px)",
};
