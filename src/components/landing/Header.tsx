"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { site } from "@/content/site";
import styles from "./landing.module.css";

const links = [
  { href: "#services", label: "What we make" },
  { href: "#concierge", label: "Concierge" },
  { href: "#process", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#inquire", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  // Transparent over the opening film; solid once the next screen reaches the header.
  const [overFilm, setOverFilm] = useState(true);

  useEffect(() => {
    const onScroll = () => setOverFilm(window.scrollY < window.innerHeight - 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${overFilm && !open ? styles.headerClear : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className={styles.headerBar}>
        <Link href="/" className={styles.brand}>
          EverTold <span>Studio</span>
        </Link>
        <p className={styles.headerMeta}>A wedding website studio</p>
        <a className={styles.headerMeta} href={`mailto:${site.email}`}>
          Inquiries — {site.email}
        </a>
        <nav className={styles.headerNav} aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} aria-label="Mobile" inert={!open}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ "--i": i } as React.CSSProperties}>
            <span>0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <a className={styles.menuMail} href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </nav>
    </header>
  );
}
