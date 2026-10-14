import styles from "./landing.module.css";

const packages = [
  {
    name: "The Save the Date",
    summary: "One beautiful page to announce the date and start the countdown.",
    items: [
      "Custom one-page design",
      "Date, place & live countdown",
      "Guest address & email collection",
      "Add-to-calendar for guests",
    ],
  },
  {
    name: "The Celebration",
    summary: "Your full wedding website with per-event RSVPs.",
    items: [
      "Everything in The Save the Date",
      "Story, schedule, travel & FAQs",
      "Per-event RSVPs & guest list export",
      "Maps, dress codes & hotel blocks",
    ],
  },
  {
    name: "The Full Story",
    summary: "The complete immersive experience, with your own AI concierge.",
    items: [
      "Everything in The Celebration",
      "Scroll-told, cinematic design",
      "AI concierge trained on your wedding",
      "Wedding Vault for every detail",
      "Post-wedding gallery & keepsake",
    ],
    featured: true,
  },
];

export function Packages() {
  return (
    <section className={styles.packages} aria-labelledby="packages-title">
      <div className={styles.packagesHead}>
        <p className="eyebrow">(07) — Packages</p>
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
              Enquire for pricing
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
