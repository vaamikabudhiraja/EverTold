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
            <p className="eyebrow">EverTold</p>
            <a href="#services">What we make</a>
            <a href="#process">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <p className="eyebrow">Talk to us</p>
            <a href="#concierge">Ask the concierge</a>
            <a href="#inquire">Start your website</a>
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
        <span>We make wedding websites</span>
      </div>
    </footer>
  );
}
