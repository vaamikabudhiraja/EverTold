import Image from "next/image";
import Link from "next/link";

import { Reveals } from "@/components/Reveals";
import type { Wedding } from "@/content/weddings/types";
import { formatDate, formatTime, shortDay } from "@/lib/format";
import { AddToCalendar } from "./AddToCalendar";
import { ConciergeWidget, OpenConciergeButton } from "./ConciergeWidget";
import { Countdown } from "./Countdown";
import { RsvpForm } from "./RsvpForm";
import { WeddingHero } from "./WeddingHero";
import { WeddingNav } from "./WeddingNav";
import styles from "./wedding.module.css";

const storyColors = ["var(--coral)", "var(--lilac)", "var(--teal)", "var(--gold)"];
const storyInk = ["var(--ink)", "var(--ink)", "var(--ivory)", "var(--ink)"];

function groupByDay(w: Wedding) {
  const days = new Map<string, Wedding["events"]>();
  for (const e of w.events) {
    const key = new Intl.DateTimeFormat("en-CA", { timeZone: w.timezone }).format(new Date(e.start));
    days.set(key, [...(days.get(key) ?? []), e]);
  }
  return [...days.entries()];
}

export function WeddingSite({ wedding: w }: { wedding: Wedding }) {
  const names = `${w.couple.first} & ${w.couple.second}`;
  const ceremony = w.events.find((e) => e.id === "wedding") ?? w.events[0];
  const suggestions = [
    `What should I wear to the ${w.events[2]?.name ?? w.events[0].name}?`,
    "How do I get from the airport?",
    "Are kids invited?",
    "Is there a shuttle?",
  ];

  return (
    <div
      className={styles.site}
      style={
        {
          "--accent": w.theme.accent,
          "--accent-ink": w.theme.accentInk,
          "--paper": w.theme.paper,
        } as React.CSSProperties
      }
    >
      <WeddingNav monogram={`${w.couple.first[0]} & ${w.couple.second[0]}`} />

      <main id="main">
        <WeddingHero wedding={w}>
          <Countdown target={ceremony.start} />
        </WeddingHero>

        {/* Welcome */}
        <section className={styles.welcome} aria-labelledby="welcome-title">
          <p className="eyebrow" id="welcome-title">
            Welcome
          </p>
          <p className={styles.welcomeText} data-reveal>
            {w.welcome}
          </p>
          <div className={styles.welcomeFoot} data-reveal>
            <p className={styles.signature}>— {names}</p>
            <OpenConciergeButton className={styles.ghostBtn}>Ask our concierge</OpenConciergeButton>
          </div>
        </section>

        {/* Story */}
        <section id="story" aria-labelledby="story-title" className={styles.story}>
          <h2 id="story-title" className="visually-hidden">
            Our story
          </h2>
          {w.story.map((c, i) => (
            <article
              key={c.year}
              className={styles.chapter}
              style={{ background: storyColors[i % storyColors.length], color: storyInk[i % storyInk.length] }}
            >
              <span className={`display ${styles.chapterYear}`} aria-hidden>
                {c.year}
              </span>
              <div className={styles.chapterText} data-reveal>
                <p className="eyebrow">
                  Chapter {i + 1} · {c.year}
                </p>
                <h3 className={styles.chapterTitle}>{c.title}</h3>
                <p>{c.body}</p>
              </div>
              {c.photo && (
                <div className={styles.chapterPhoto} style={{ rotate: `${i % 2 ? 3 : -3}deg` }} data-reveal>
                  <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width: 900px) 30vw, 70vw" />
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Schedule */}
        <section id="weekend" className={styles.schedule} aria-labelledby="weekend-title">
          <div className={styles.sectionHead}>
            <h2 id="weekend-title" className={`display ${styles.bigTitle}`}>
              The weekend
            </h2>
            <p>
              {w.events.length} celebrations across {groupByDay(w).length} days. All times are local to{" "}
              {w.location.region}.
            </p>
          </div>

          {groupByDay(w).map(([day, events]) => {
            const d = shortDay(events[0].start, w.timezone);
            return (
              <div key={day} className={styles.day}>
                <div className={styles.dayLabel}>
                  <span className="display">{d.day}</span>
                  <span className="eyebrow">
                    {d.weekday} · {d.month}
                  </span>
                </div>
                <div className={styles.dayEvents}>
                  {events.map((e) => (
                    <article key={e.id} className={styles.event} data-reveal>
                      <p className={styles.eventTime}>
                        {formatTime(e.start, w.timezone)} – {formatTime(e.end, w.timezone)}
                      </p>
                      <div className={styles.eventMain}>
                        <h3 className={`display ${styles.eventName}`}>{e.name}</h3>
                        <p className={styles.eventVenue}>{e.venue}</p>
                        <p className={styles.eventDesc}>{e.description}</p>
                      </div>
                      <div className={styles.eventSide}>
                        <p className="eyebrow">Dress code</p>
                        <p>{e.dressCode}</p>
                        {e.palette && (
                          <div className={styles.swatches} aria-label="Colour palette">
                            {e.palette.map((c) => (
                              <span key={c} style={{ background: c }} />
                            ))}
                          </div>
                        )}
                        <div className={styles.eventActions}>
                          <AddToCalendar wedding={w} eventId={e.id} />
                          {e.mapUrl && (
                            <a href={e.mapUrl} target="_blank" rel="noreferrer">
                              Map ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Travel */}
        <section id="travel" className={styles.travel} aria-labelledby="travel-title">
          <div className={styles.sectionHead}>
            <h2 id="travel-title" className={`display ${styles.bigTitle}`}>
              Getting there
            </h2>
            <p>
              {w.location.city}, {w.location.region}, {w.location.country}
            </p>
          </div>
          <div className={styles.travelGrid}>
            {[
              ["Flying in", w.travel.airport],
              ["Arrivals", w.travel.gettingThere],
              ["Getting around", w.travel.gettingAround],
              ["Weather", w.travel.weather],
            ].map(([label, text]) => (
              <div key={label} className={styles.travelItem} data-reveal>
                <p className="eyebrow">{label}</p>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <h3 className={styles.subTitle}>Where to stay</h3>
          <div className={styles.stays}>
            {w.travel.stays.map((s, i) => (
              <article key={s.name} className={styles.stay} data-reveal>
                <span className={styles.stayNum}>0{i + 1}</span>
                <h4>{s.name}</h4>
                <p className="eyebrow">{s.kind}</p>
                <p className={styles.stayDistance}>{s.distance}</p>
                <p>{s.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Dress + gifts */}
        <section className={styles.notes} aria-label="Dress code and gifts">
          <div data-reveal>
            <p className="eyebrow">What to wear</p>
            <p className={styles.noteText}>{w.dressGuide}</p>
            <ul className={styles.paletteList}>
              {w.events.map((e) => (
                <li key={e.id}>
                  <span>{e.name}</span>
                  <span className={styles.swatches}>
                    {e.palette?.map((c) => (
                      <span key={c} style={{ background: c }} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <p className="eyebrow">Gifts</p>
            <p className={styles.noteText}>{w.gifts}</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.sectionHead}>
            <h2 id="faq-title" className={`display ${styles.bigTitle}`}>
              Good questions
            </h2>
            <p>
              Can&apos;t find it here?{" "}
              <OpenConciergeButton className={styles.inlineLink}>Ask the concierge</OpenConciergeButton>
            </p>
          </div>
          <div className={styles.faqList}>
            {w.faqs.map((f) => (
              <details key={f.q} className={styles.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className={styles.rsvp} aria-labelledby="rsvp-title">
          <div className={styles.rsvpHead}>
            <p className="eyebrow">Kindly reply by {formatDate(w.rsvpDeadline)}</p>
            <h2 id="rsvp-title" className={`display ${styles.rsvpTitle}`}>
              Will you
              <br />
              be there?
            </h2>
            <p>One reply per invitation. You can come back and update it any time before the deadline.</p>
          </div>
          <RsvpForm
            slug={w.slug}
            events={w.events
              .filter((e) => e.rsvp)
              .map((e) => ({ id: e.id, name: e.name, when: shortDay(e.start, w.timezone) }))}
            maxPartySize={w.rsvpOptions.maxPartySize}
            askSong={w.rsvpOptions.askSong}
            askDiet={w.rsvpOptions.askDiet}
          />
        </section>

        {/* Gallery */}
        <section className={styles.gallery} aria-label="Moments">
          <div className={styles.marquee}>
            {[...w.gallery, ...w.gallery].map((p, i) => (
              <div key={i} className={styles.galleryItem} aria-hidden={i >= w.gallery.length}>
                <Image src={p.src} alt={i < w.gallery.length ? p.alt : ""} fill sizes="30vw" />
              </div>
            ))}
          </div>
          <p className={styles.hashtag}>{w.couple.hashtag}</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerNames}>
          {w.couple.first} <em>&amp;</em> {w.couple.second}
        </p>
        <div className={styles.contacts}>
          {w.contacts.map((c) => (
            <div key={c.name}>
              <p className="eyebrow">{c.role}</p>
              <p>{c.name}</p>
              {c.email && <a href={`mailto:${c.email}`}>{c.email}</a>}
              {c.phone && <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>}
            </div>
          ))}
        </div>
        <Link href="/" className={styles.madeWith}>
          Made with <strong>EverTold</strong>
        </Link>
      </footer>

      <ConciergeWidget slug={w.slug} coupleNames={names} suggestions={suggestions} />
      <Reveals />
    </div>
  );
}
