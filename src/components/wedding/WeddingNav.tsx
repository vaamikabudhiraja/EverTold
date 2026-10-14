"use client";

import { useEffect, useState } from "react";

import styles from "./wedding.module.css";

const links = [
  { href: "#story", label: "Story" },
  { href: "#weekend", label: "Weekend" },
  { href: "#travel", label: "Travel" },
  { href: "#faq", label: "FAQ" },
];

export function WeddingNav({ monogram }: { monogram: string }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${solid ? styles.navSolid : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <a href="#top" className={styles.monogram}>
        {monogram}
      </a>
      <nav className={styles.navLinks} aria-label="Wedding">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#rsvp" className={styles.navRsvp}>
        RSVP
      </a>
    </header>
  );
}
