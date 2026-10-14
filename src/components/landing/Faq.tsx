import styles from "./landing.module.css";

const faqs = [
  {
    q: "What exactly do we get?",
    a: "A wedding website designed just for you, at its own link: your story, the schedule for every event, travel and hotel details, FAQs for guests, RSVPs — and, if you'd like, an AI concierge that answers your guests' questions.",
  },
  {
    q: "Do our guests need an app or an account?",
    a: "No. It's a website, so it opens on any phone or laptop from the link on your invitation.",
  },
  {
    q: "How does the AI concierge work?",
    a: "It reads only your wedding details — times, venues, dress codes, travel, FAQs — and answers guests any time of day. If it doesn't know something, it says so and points them to you or your planner. You can try it on this page.",
  },
  {
    q: "Can guests RSVP to some events and not others?",
    a: "Yes. Each event gets its own RSVP, with plus-ones, dietary needs and song requests.",
  },
  {
    q: "Where do the RSVPs go?",
    a: "To your private guest list, with live headcounts for every event, everyone's dietary notes and a one-click spreadsheet download.",
  },
  {
    q: "Can it match the look of our wedding?",
    a: "That's the point. Every site is designed around your colours, your photos and the feel of your celebration — nothing is a template.",
  },
  {
    q: "How long does it take, and what does it cost?",
    a: "It depends on the package and how many events you're having. Tell us about your wedding below and we'll come back with timings and pricing.",
  },
];

export function Faq() {
  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-title">
      <div className={styles.faqHead}>
        <p className="eyebrow">(08) — Questions couples ask</p>
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
