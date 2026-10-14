import { packages } from "@/content/studio";
import styles from "./landing.module.css";

export function Packages() {
  return (
    <section className={styles.packages} id="pricing" aria-labelledby="packages-title">
      <div className={styles.packagesHead}>
        <p className="eyebrow">(06) — Packages & pricing</p>
        <h2 id="packages-title" className={`display ${styles.packagesTitle}`}>
          Pick your chapter
        </h2>
      </div>
      <div className={styles.packageGrid}>
        {packages.map((p, i) => (
          <article key={p.name} className={`${styles.package} ${p.featured ? styles.packageFeatured : ""}`} data-reveal>
            <span className={styles.packageNum}>0{i + 1}</span>
            <h3>{p.name}</h3>
            <p className={styles.packageSummary}>{p.summary}</p>
            <ul>
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="#inquire" className={styles.packageCta}>
              Ask for pricing
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
