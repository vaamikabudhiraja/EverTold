import { faqs } from "@/content/studio";
import styles from "./landing.module.css";

export function Faq() {
  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-title">
      <div className={styles.faqHead}>
        <p className="eyebrow">(07) — Questions couples ask</p>
        <h2 id="faq-title" className={`display ${styles.faqTitle}`}>
          Good to know
        </h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((f) => (
          <details key={f.q} className={styles.faqItem}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
