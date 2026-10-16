"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { filmStrip, type FilmFrame } from "@/content/media";
import styles from "./film.module.css";

/*
 * The opening film, drawn live in the page rather than played as a video, so
 * phones never show a play button (iOS blocks autoplay in Low Power Mode).
 *
 * A strip of film rests on a lightbox, the camera dives into it and the
 * pictures pull through the gate one by one, then a light leak burns the
 * frame out to black and it loops. Everything is a pure function of the
 * clock T, drawn in "stage units" on a stage 1080 units tall (960 wide on
 * phones) that is scaled to fill the screen.
 */

// Strip geometry.
const FH = 750;
const GAP = 40;
const BAND = 110;
const SH = FH + BAND * 2;

// Scene cues, in seconds: Open → Projector → Burnout → loop.
const OPEN = 0;
const PROJECTOR = 1.5;
const BURNOUT = 23.5;
const END = 26.5;
// Reduced motion shows one still: the first picture in the gate, title up.
const STILL = 3.8;
// Grain, dust and gate weave tick at film speed.
const FPS = 24;

// Title card: each word lands on its own beat, the second line after a pause.
const TITLE = (() => {
  let n = 0;
  return ["EVERY WEDDING HAS A STORY.", "LET IT BE TOLD."].map((line, i) =>
    line.split(" ").map((text) => ({ text, n, start: OPEN + n++ * 0.38 + (i > 0 ? 0.5 : 0) })),
  );
})();

type Slot = { x: number; w: number; lead?: "fogL" | "fogR" | "base"; n?: number; frame?: FilmFrame };

const SLOTS: Slot[] = (() => {
  const list: Omit<Slot, "x" | "w">[] = [
    { lead: "fogL" },
    { lead: "base" },
    ...filmStrip.map((frame, i) => ({ frame, n: i + 1 })),
    { lead: "base" },
    { lead: "fogR" },
  ];
  let x = GAP / 2;
  return list.map((s) => {
    const w = s.frame?.wide ? 1125 : 600;
    const slot = { ...s, x, w };
    x += w + GAP;
    return slot;
  });
})();
const LENGTH = SLOTS[SLOTS.length - 1].x + SLOTS[SLOTS.length - 1].w + GAP / 2;
const LEAD = 2;
const centre = (i: number) => SLOTS[LEAD + i].x + SLOTS[LEAD + i].w / 2;

// Passing light leaks, authored on a 1920 × 1080 stage.
const LEAKS = [
  { c: PROJECTOR - 0.2, w: 1.0, x: 220, y: 880, size: 1500 },
  { c: PROJECTOR + 6.8, w: 0.9, x: 1780, y: 520, size: 1250 },
  { c: PROJECTOR + 13.1, w: 0.7, x: 120, y: 280, size: 1150 },
  { c: PROJECTOR + 17.3, w: 1.0, x: 1720, y: 940, size: 1350 },
];
const LEAK_SIZE = 1000;
const SPECKS = 3;
const GRAINS = 6;

const easeOutCubic = (t: number) => --t * t * t + 1;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t);
const MOTION = { glide: easeInOutCubic, settle: easeOutCubic, snap: easeInOutQuart };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const tween = (T: number, from: number, to: number, start: number, end: number, ease = MOTION.glide) =>
  T <= start ? from : T >= end ? to : from + (to - from) * ease((T - start) / (end - start));
const rnd = (n: number) => {
  const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};
const bell = (t: number, c: number, w: number) => {
  const d = (t - c) / w;
  return Math.max(0, 1 - d * d);
};

type Props = {
  /** False while the film is covered, so it stops drawing. */
  playing: boolean;
};

export function FilmStrip({ playing }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const live = useRef(playing);

  useEffect(() => {
    live.current = playing;
  }, [playing]);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const one = (part: string) => host.querySelector<HTMLElement>(`[data-part="${part}"]`)!;
    const all = (part: string) => [...host.querySelectorAll<HTMLElement>(`[data-part="${part}"]`)];
    const e = {
      stage: one("stage"),
      lightbox: one("lightbox"),
      lamp: one("lamp"),
      strip: one("strip"),
      shade: one("shade"),
      leaks: all("leak"),
      title: one("title"),
      words: all("word"),
      white: one("white"),
      black: one("black"),
      flicker: one("flicker"),
      specks: all("speck"),
      hair: one("hair"),
      scratch: one("scratch"),
      grains: all("grain"),
    };

    // Six frames of noise, cycled one per film frame.
    e.grains.forEach((g) => {
      const c = document.createElement("canvas");
      c.width = c.height = 220;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const img = ctx.createImageData(220, 220);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 128 + (Math.random() + Math.random() - 1) * 127;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      g.style.backgroundImage = `url(${c.toDataURL("image/jpeg", 0.85)})`;
    });

    // The stage keeps the film's proportions on wide screens and turns into
    // a tall reel on phones, then scales to fill the hero exactly.
    let W = 1920;
    let H = 1080;
    const fit = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      const aspect = w / h;
      W = aspect >= 1 ? 1080 * aspect : Math.max(960, 1080 * aspect);
      H = W / aspect;
      const s = e.stage.style;
      s.width = `${W}px`;
      s.height = `${H}px`;
      s.transform = `scale(${w / W})`;
    };

    let tone = "";
    const draw = (T: number) => {
      const f = Math.floor(T * FPS);
      const sx = W / 1920;
      const sy = H / 1080;

      // The projector pulls each picture into the gate with a snap.
      const PULL = 0.32;
      let fx = centre(0);
      let pull = 0;
      for (let k = 0; k < filmStrip.length - 1; k++) {
        const p = clamp((T - (PROJECTOR + 2.6 + k * 2.1)) / PULL, 0, 1);
        fx += (centre(k + 1) - centre(k)) * MOTION.snap(p);
        if (p > 0 && p < 1) pull = Math.sin(Math.PI * p);
      }
      const zoom = tween(T, 0.235, 1, PROJECTOR - 1.1, PROJECTOR + 1.1);
      const out = tween(T, 0, 1, BURNOUT, BURNOUT + 2.2);
      fx += tween(T, 0, 2200, BURNOUT + 0.2, END);
      const scale = lerp(lerp(0.42, 1.12, zoom), 0.4, out) + 0.02 * Math.sin(T * 0.6) * (1 - zoom + out);
      const rot = lerp(-6, 0, zoom) + 5 * out;
      const dark = zoom * (1 - out);

      // Gate weave, plus a slow drift while it rests on the lightbox.
      const wx =
        (Math.sin(T * 7.3) + 0.5 * Math.sin(T * 13.1)) * 1.1 +
        (rnd(f) - 0.5) * 1.4 +
        Math.sin(T * 0.7) * 8 * (1 - dark);
      const wy =
        (Math.sin(T * 5.9 + 1) + 0.5 * Math.sin(T * 11.7)) * 1.1 +
        (rnd(f + 3) - 0.5) * 1.4 +
        Math.cos(T * 0.5) * 6 * (1 - dark);

      e.lightbox.style.opacity = `${1 - dark}`;
      e.lamp.style.opacity = `${dark}`;
      const strip = e.strip.style;
      strip.transform = `translate(${W / 2 + wx}px, ${H / 2 + wy}px) rotate(${rot}deg) scale(${scale}) translate(${-fx}px, ${-SH / 2}px)`;
      strip.filter = pull > 0.05 ? `blur(${(pull * 4).toFixed(2)}px)` : "none";
      e.shade.style.opacity = `${pull * 0.5}`;

      // Light leaks drift across, and the last one burns the frame out.
      const burn = tween(T, 0, 1, BURNOUT + 1.2, BURNOUT + 2.5);
      const leaks = [
        ...LEAKS.map((l) => ({
          x: (l.x + (T - l.c) * 140) * sx,
          y: l.y * sy,
          size: l.size,
          o: 0.85 * bell(T, l.c, l.w),
        })),
        { x: lerp(2300, 1200, burn) * sx, y: lerp(300, 540, burn) * sy, size: lerp(1600, 4600, burn), o: burn },
      ];
      leaks.forEach((l, i) => {
        const s = e.leaks[i].style;
        s.visibility = l.o > 0.001 ? "visible" : "hidden";
        s.opacity = `${l.o}`;
        s.transform = `translate(${l.x - l.size / 2}px, ${l.y - l.size / 2}px) scale(${l.size / LEAK_SIZE})`;
      });

      // Title card: words land one by one, with a projector flicker.
      TITLE.flat().forEach((w) => {
        e.words[w.n].style.opacity = `${tween(T, 0, 1, w.start, w.start + 0.12, MOTION.settle)}`;
      });
      const titleOut = 1 - tween(T, 0, 1, BURNOUT + 2.2, BURNOUT + 2.9);
      const title = e.title.style;
      title.opacity = `${titleOut * (0.94 + rnd(f * 2.7) * 0.06)}`;
      title.transform = `translate(${(rnd(f * 5.1) - 0.5) * 1.2}px, ${(rnd(f * 6.3) - 0.5) * 1.2}px)`;

      const black = tween(T, 0, 1, BURNOUT + 2.4, BURNOUT + 3.0);
      e.white.style.opacity = `${tween(T, 0, 0.85, BURNOUT + 2.1, BURNOUT + 2.6, MOTION.settle)}`;
      e.black.style.opacity = `${black}`;
      e.flicker.style.opacity = `${(0.03 + rnd(f * 1.13) * 0.07) * (0.5 + 0.5 * dark)}`;

      // Dust, the odd hair, and scratches that hold for a beat.
      const dusty = rnd(f * 1.7) > 0.5;
      const specks = dusty ? 1 + Math.floor(rnd(f * 2.3) * 3) : 0;
      e.specks.forEach((el, j) => {
        const s = el.style;
        if (j >= specks) {
          s.visibility = "hidden";
          return;
        }
        const size = 2 + rnd(f * 5 + j) * 6;
        s.visibility = "visible";
        s.width = `${size}px`;
        s.height = `${size * (0.6 + rnd(f + j) * 0.8)}px`;
        s.background = rnd(f * 3 + j) > 0.72 ? "rgba(255,248,232,0.7)" : "rgba(8,6,4,0.75)";
        s.transform = `translate(${rnd(f * 31 + j * 7) * W}px, ${rnd(f * 17 + j * 13) * H}px)`;
      });
      const hair = e.hair.style;
      if (dusty && rnd(f * 0.37) > 0.82) {
        hair.visibility = "visible";
        hair.transform = `translate(${rnd(f * 41) * W}px, ${rnd(f * 43) * H}px) rotate(${rnd(f * 47) * 360}deg)`;
      } else {
        hair.visibility = "hidden";
      }
      const seg = Math.floor(T / 1.4);
      const scratch = e.scratch.style;
      if (rnd(seg * 3.1) > 0.45) {
        scratch.visibility = "visible";
        scratch.opacity = `${0.12 + rnd(f * 0.9) * 0.22}`;
        scratch.transform = `translateX(${rnd(seg * 9.7) * W + Math.sin(T * 31) * 2}px)`;
      } else {
        scratch.visibility = "hidden";
      }
      e.grains.forEach((g, i) => {
        const s = g.style;
        const on = i === f % GRAINS;
        s.visibility = on ? "visible" : "hidden";
        if (on) s.transform = `translate(${Math.floor(rnd(f * 7) * 220)}px, ${Math.floor(rnd(f * 9) * 220)}px)`;
      });

      // Lets the clear header switch to dark text while the lightbox is up.
      const next = 1 - dark > 0.5 && black < 0.5 ? "light" : "dark";
      if (next !== tone) document.documentElement.dataset.filmTone = tone = next;
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let T = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (live.current) {
        T = (T + dt) % END;
        draw(T);
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (still.matches) {
        draw(STILL);
      } else {
        draw(T);
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    fit();
    start();
    e.stage.style.visibility = "visible";

    const ro = new ResizeObserver(() => {
      fit();
      draw(still.matches ? STILL : T);
    });
    ro.observe(host);
    still.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      still.removeEventListener("change", start);
      delete document.documentElement.dataset.filmTone;
    };
  }, []);

  return (
    <div className={styles.film} ref={root} aria-hidden>
      <div className={styles.stage} data-part="stage">
        <div className={`${styles.layer} ${styles.lightbox}`} data-part="lightbox" />
        <div className={`${styles.layer} ${styles.lamp}`} data-part="lamp" />

        <div className={styles.strip} style={{ width: LENGTH, height: SH }} data-part="strip">
          <div className={styles.holes} />
          <div className={`${styles.holes} ${styles.holesBottom}`} />
          {SLOTS.map((slot, i) => (
            <div key={i}>
              <div
                className={`${styles.frame} ${slot.lead ? styles[slot.lead] : ""}`}
                style={{ left: slot.x, width: slot.w }}
              >
                {slot.frame && (
                  <Image
                    src={slot.frame.src}
                    alt=""
                    fill
                    sizes={
                      slot.frame.wide ? "(max-aspect-ratio: 1/1) 130vw, 120vh" : "(max-aspect-ratio: 1/1) 75vw, 65vh"
                    }
                    loading="eager"
                    fetchPriority={i < LEAD + 2 ? "high" : "auto"}
                    style={{
                      objectFit: "cover",
                      objectPosition: slot.frame.position,
                      transform: slot.frame.zoom ? `scale(${slot.frame.zoom})` : undefined,
                    }}
                  />
                )}
              </div>
              {slot.n && (
                <>
                  <div className={styles.edgeTop} style={{ left: slot.x }}>
                    SAFETY FILM 400 ◂ {String(slot.n).padStart(2, "0")}
                  </div>
                  <div className={styles.edgeBottom} style={{ left: slot.x, width: slot.w }}>
                    <span>▸ {slot.n}</span>
                    <span>{slot.n}A</span>
                    <span>▸</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={`${styles.layer} ${styles.shade}`} data-part="shade" />
        {[...LEAKS, null].map((_, i) => (
          <div key={i} className={styles.leak} data-part="leak" />
        ))}

        <div className={`${styles.layer} ${styles.title}`} data-part="title">
          {TITLE.map((line, i) => (
            <p key={i} className={styles.titleLine}>
              {line.map((w) => (
                <span key={w.n} data-part="word">
                  {w.text}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className={`${styles.layer} ${styles.white}`} data-part="white" />
        <div className={`${styles.layer} ${styles.black}`} data-part="black" />
        <div className={`${styles.layer} ${styles.flicker}`} data-part="flicker" />
        {Array.from({ length: SPECKS }, (_, i) => (
          <div key={i} className={styles.speck} data-part="speck" />
        ))}
        <div className={styles.hair} data-part="hair" />
        <div className={styles.scratch} data-part="scratch" />
        {Array.from({ length: GRAINS }, (_, i) => (
          <div key={i} className={styles.grain} data-part="grain" />
        ))}
        <div className={`${styles.layer} ${styles.vignette}`} />
      </div>
    </div>
  );
}
