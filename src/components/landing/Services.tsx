"use client";

import Image from "next/image";
import { useRef } from "react";

import { heroFilm, photos } from "@/content/media";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import styles from "./landing.module.css";

type Card = { title: string; body: string; media: "chat" | "film" | keyof typeof photos };

const cards: Card[] = [
  {
    title: "The Story Site",
    body: "An immersive, scroll-told website for your wedding — your story, your weekend, your city — designed around your palette, never a template.",
    media: "kiss",
  },
  {
    title: "RSVP & Guest List",
    body: "Per-event RSVPs with plus-ones, dietary notes and song requests, flowing into a live guest list you can export in one click.",
    media: "noodles",
  },
  {
    title: "AI Concierge",
    body: "A concierge that has read every detail of your wedding. Guests ask what to wear to the sangeet at 2am; it answers instantly and accurately.",
    media: "chat",
  },
  {
    title: "The Wedding Vault",
    body: "Every detail in one place — events, venues, hotel blocks, travel, FAQs. Update it once and the site and concierge update with it.",
    media: "doorstep",
  },
  {
    title: "Schedule & Travel",
    body: "Multi-day itineraries with add-to-calendar, maps, shuttle times, room-block codes and weather — everything a travelling guest needs.",
    media: "film",
  },
  {
    title: "Gallery & Keepsake",
    body: "Before the day, your story. After it, a gallery your guests return to. Your site becomes the keepsake of the weekend.",
    media: "piggyback",
  },
];

function CardMedia({ media }: { media: Card["media"] }) {
  if (media === "chat") {
    return (
      <div className={styles.chatMock} aria-hidden>
        <p className={styles.mockUser}>What should I wear to the Sangeet?</p>
        <p className={styles.mockBot}>
          Indo-glam — sequins, jewel tones and shoes you can dance in. It starts at 7:30 pm in the Palm House courtyard.
        </p>
        <p className={styles.mockUser}>And is there a shuttle back?</p>
        <p className={styles.mockBot}>
          Every 45 minutes until the end of the night, back to Casa Mareia and Saltwater Inn.
        </p>
      </div>
    );
  }
  if (media === "film") {
    return (
      <video autoPlay muted loop playsInline poster={heroFilm.poster} aria-hidden>
        <source src={heroFilm.webm} type="video/webm" />
        <source src={heroFilm.mp4} type="video/mp4" />
      </video>
    );
  }
  const p = photos[media];
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
        {cards.map((c, i) => (
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
