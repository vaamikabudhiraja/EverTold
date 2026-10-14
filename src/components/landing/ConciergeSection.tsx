import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import styles from "./landing.module.css";

const suggestions = [
  "What do we get with a wedding website?",
  "How does the AI concierge work for our guests?",
  "What's in The Full Story package?",
  "How do we get started?",
];

export function ConciergeSection() {
  return (
    <section className={styles.concierge} id="concierge" aria-labelledby="concierge-title">
      <div className={styles.conciergeCopy}>
        <p className="eyebrow">(04) — Try the AI concierge</p>
        <h2 id="concierge-title" className={`display ${styles.conciergeTitle}`}>
          Ask it
          <br />
          anything.
        </h2>
        <p className={styles.conciergeLede}>
          Every website we make can come with a concierge that knows your wedding inside out and answers your guests day
          and night. This one knows EverTold — go ahead, ask it about us.
        </p>
        <ul className={styles.ticks}>
          <li>Answers only from your wedding details</li>
          <li>Knows every time, venue, dress code and shuttle</li>
          <li>Hands tricky questions to you or your planner</li>
        </ul>
      </div>
      <div className={styles.conciergeChat}>
        <ConciergeChat suggestions={suggestions} />
      </div>
    </section>
  );
}
