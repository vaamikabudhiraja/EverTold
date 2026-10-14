"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { site } from "@/content/site";
import styles from "./landing.module.css";

const links = [
  { href: "#services", label: "Services" },
  { href: "#concierge", label: "Concierge" },
  { href: "#demo", label: "Demo" },
  { href: "#process", label: "Process" },
  { href: "#inquire", label: "Inquire" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className={styles.headerBar}>
        <Link href="/" className={styles.brand}>
          EverTold <span>Studio</span>
        </Link>
        <p className={styles.headerMeta}>Wedding websites, est. 2026</p>
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
