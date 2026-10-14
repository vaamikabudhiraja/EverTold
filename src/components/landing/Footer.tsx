import Link from "next/link";

import { DEMO_SLUG } from "@/content/weddings";
import { site } from "@/content/site";
import styles from "./landing.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <p className={styles.footerLine}>
          Every love story
          <br />
          deserves to be <em>told.</em>
        </p>
        <div className={styles.footerCols}>
          <div>
            <p className="eyebrow">Studio</p>
            <a href="#services">Services</a>
            <a href="#concierge">Concierge</a>
            <a href="#process">Process</a>
          </div>
          <div>
            <p className="eyebrow">See it</p>
            <Link href={`/w/${DEMO_SLUG}`}>Demo wedding</Link>
            <a href="#inquire">Inquire</a>
          </div>
          <div>
            <p className="eyebrow">Say hello</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <p className={styles.footerMark} aria-hidden>
        EVERTOLD
      </p>
      <div className={styles.footerBase}>
        <span>© 2026 EverTold Studio</span>
        <span>Wedding websites, RSVPs & AI concierges</span>
      </div>
    </footer>
  );
}
