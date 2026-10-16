"use client";

import Image from "next/image";
import { useRef } from "react";

import { servicePhotos } from "@/content/media";
import { services, type Service } from "@/content/studio";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

function CardMedia({ media }: { media: Service["media"] }) {
  if (media === "chat") {
    return (
      <div className={styles.chatMock} aria-hidden>
        <p className={styles.mockUser}>What time should we arrive for the ceremony?</p>
        <p className={styles.mockBot}>Please be seated by 4:15 pm — the ceremony starts at 4:30 on the beach.</p>
        <p className={styles.mockUser}>And is there a shuttle back to the hotel?</p>
        <p className={styles.mockBot}>Yes, every 45 minutes from the venue until the music stops.</p>
      </div>
    );
  }
  const p = servicePhotos[media];
  return <Image src={p.src} alt={p.alt} fill sizes="(min-width: 900px) 32vw, 85vw" />;
}

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION.motion} and ${MOTION.desktop}`, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.services} ref={root} id="services" aria-labelledby="services-title">
      <div className={styles.servicesHead}>
        <h2 id="services-title" className={styles.servicesTitle}>
          What we make
        </h2>
        <p>Every EverTold website is designed from scratch for one couple. Here&apos;s what can go into yours.</p>
        <span className="eyebrow">(02) — 01 / 06</span>
      </div>
      <div className={styles.track} data-track>
        {services.map((c, i) => (
          <article key={c.title} className={styles.card}>
            <div className={styles.cardMedia}>
              <CardMedia media={c.media} />
            </div>
            <span className={styles.cardNum}>0{i + 1}</span>
            <div className={styles.cardBody}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
