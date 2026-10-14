import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getWedding } from "@/content/weddings";
import { checkAccess, guestList } from "@/lib/admin";
import styles from "./guests.module.css";

export const metadata: Metadata = {
  title: "Guest list",
  robots: { index: false, follow: false },
};

type Props = PageProps<"/w/[slug]/guests">;

async function GuestList({ params, searchParams }: Pick<Props, "params" | "searchParams">) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) notFound();

  const { key } = await searchParams;
  const keyValue = typeof key === "string" ? key : undefined;
  const access = checkAccess(keyValue);
  const names = `${wedding.couple.first} & ${wedding.couple.second}`;

  if (access !== "ok") {
    return (
      <main className={styles.gate}>
        <p className="eyebrow">{names}</p>
        <h1 className="display">Guest list</h1>
        {access === "disabled" ? (
          <p>The guest list is switched off. Set EVERTOLD_ADMIN_KEY on the server to turn it on.</p>
        ) : (
          <form className={styles.gateForm}>
            <label htmlFor="key">Access key</label>
            <input id="key" name="key" type="password" required autoComplete="current-password" />
            <button type="submit">Open</button>
            {keyValue && <p role="alert">That key didn&apos;t match.</p>}
          </form>
        )}
      </main>
    );
  }

  const g = await guestList(wedding);
  const exportHref = `/api/rsvp/export?slug=${wedding.slug}${keyValue ? `&key=${encodeURIComponent(keyValue)}` : ""}`;
  const stats = [
    { label: "Responses", value: g.responses },
    { label: "Coming (parties)", value: g.attendingParties },
    { label: "Guests coming", value: g.headcount },
    { label: "Declined", value: g.declined },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div>
          <p className="eyebrow">Wedding vault · {names}</p>
          <h1 className="display">Guest list</h1>
        </div>
        <div className={styles.headActions}>
          <a href={exportHref} className={styles.btn}>
            Download CSV
          </a>
          <Link href={`/w/${wedding.slug}`} className={styles.link}>
            View site ↗
          </Link>
        </div>
      </header>

      {process.env.NODE_ENV === "development" && !process.env.EVERTOLD_ADMIN_KEY && (
        <p className={styles.notice}>Development mode: this page is open. Set EVERTOLD_ADMIN_KEY to protect it.</p>
      )}

      <dl className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="eyebrow">{s.label}</dt>
            <dd className="display">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h2 className="eyebrow">Headcount by event</h2>
          <ul className={styles.bars}>
            {g.perEvent.map((e) => (
              <li key={e.id}>
                <span>{e.name}</span>
                <span className={styles.bar}>
                  <span style={{ width: `${g.headcount ? (e.guests / g.headcount) * 100 : 0}%` }} />
                </span>
                <strong>{e.guests}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.card}>
          <h2 className="eyebrow">Dietary needs</h2>
          {g.diets.length ? (
            <ul className={styles.list}>
              {g.diets.map((d) => (
                <li key={d.name}>
                  <strong>{d.name}</strong> {d.diet}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>None yet.</p>
          )}
          <h2 className="eyebrow">Song requests</h2>
          {g.songs.length ? (
            <ul className={styles.list}>
              {g.songs.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong> {s.song}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>None yet.</p>
          )}
        </div>
      </section>

      <section className={styles.card}>
        <h2 className="eyebrow">All replies</h2>
        {g.rows.length ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reply</th>
                  <th>Party</th>
                  <th>Events</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.name}</strong>
                      <br />
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </td>
                    <td>{r.attending ? "Coming" : "Declined"}</td>
                    <td>
                      {r.partySize}
                      {r.guests.length > 0 && <small> + {r.guests.join(", ")}</small>}
                    </td>
                    <td>
                      {r.events
                        .map((id) => wedding.events.find((e) => e.id === id)?.name)
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td>{r.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>No replies yet. Share the site and they&apos;ll appear here.</p>
        )}
      </section>
    </main>
  );
}

export default function GuestsPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<main className={styles.page} aria-busy="true" />}>
      <GuestList params={params} searchParams={searchParams} />
    </Suspense>
  );
}
