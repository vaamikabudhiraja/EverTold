import { ConciergeChat } from "@/components/concierge/ConciergeChat";
import { DEMO_SLUG, getWedding } from "@/content/weddings";
import styles from "./landing.module.css";

const suggestions = [
  "What should I wear to the Sangeet?",
  "Which airport should I fly into?",
  "Can I bring my kids?",
  "Where should I stay?",
];

export function ConciergeSection() {
  const demo = getWedding(DEMO_SLUG)!;
  const names = `${demo.couple.first} & ${demo.couple.second}`;

  return (
    <section className={styles.concierge} id="concierge" aria-labelledby="concierge-title">
      <div className={styles.conciergeCopy}>
        <p className="eyebrow">(04) — AI concierge</p>
        <h2 id="concierge-title" className={`display ${styles.conciergeTitle}`}>
          Ask it
          <br />
          anything.
        </h2>
        <p className={styles.conciergeLede}>
          Every EverTold site can come with a concierge that has read every detail of your wedding — and nothing else.
          Try the one we built for our demo couple, {names}.
        </p>
        <ul className={styles.ticks}>
          <li>Answers only from your wedding details</li>
          <li>Knows every time, venue, dress code and shuttle</li>
          <li>Hands tricky questions to you or your planner</li>
        </ul>
      </div>
      <div className={styles.conciergeChat}>
        <ConciergeChat slug={DEMO_SLUG} coupleNames={names} suggestions={suggestions} />
      </div>
    </section>
  );
}
