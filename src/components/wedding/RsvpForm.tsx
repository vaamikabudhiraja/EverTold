"use client";

import { useState } from "react";

import styles from "./wedding.module.css";

type EventOption = { id: string; name: string; when: { weekday: string; day: string; month: string } };

type Props = {
  slug: string;
  events: EventOption[];
  maxPartySize: number;
  askSong: boolean;
  askDiet: boolean;
};

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; name?: string; attending?: boolean };

export function RsvpForm({ slug, events, maxPartySize, askSong, askDiet }: Props) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [partySize, setPartySize] = useState(1);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug,
          name,
          email: data.get("email"),
          attending: attending === true,
          events: data.getAll("events"),
          partySize,
          guests: data.getAll("guest").map(String),
          diet: data.get("diet") ?? "",
          song: data.get("song") ?? "",
          message: data.get("message") ?? "",
          website: data.get("website") ?? "",
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; updated?: boolean };
      if (!json.ok) throw new Error(json.error);
      setStatus({ state: "sent", name: name.split(" ")[0], attending: attending === true });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error && err.message ? err.message : "Something went wrong — please try again.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div className={styles.rsvpDone} role="status">
        <p className={`display ${styles.rsvpDoneTitle}`}>{status.attending ? "See you there!" : "We'll miss you."}</p>
        <p>
          Thank you{status.name ? `, ${status.name}` : ""}. Your reply is in.{" "}
          {status.attending
            ? "Watch your inbox for the details as the weekend gets closer."
            : "We'll raise a glass to you."}
        </p>
        <button type="button" className={styles.inlineLink} onClick={() => setStatus({ state: "idle" })}>
          Change my reply
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.rsvpForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (attending === null) {
          setStatus({ state: "error", message: "Let us know if you can make it." });
          return;
        }
        submit(e.currentTarget);
      }}
    >
      <label className={styles.rField}>
        <span>Full name</span>
        <input name="name" required minLength={2} autoComplete="name" />
      </label>
      <label className={styles.rField}>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>

      <fieldset className={`${styles.rField} ${styles.rWide}`}>
        <legend>Can you make it?</legend>
        <div className={styles.choice}>
          <label>
            <input type="radio" name="attending" checked={attending === true} onChange={() => setAttending(true)} />
            <span>Joyfully accepts</span>
          </label>
          <label>
            <input type="radio" name="attending" checked={attending === false} onChange={() => setAttending(false)} />
            <span>Regretfully declines</span>
          </label>
        </div>
      </fieldset>

      {attending && (
        <>
          <fieldset className={`${styles.rField} ${styles.rWide}`}>
            <legend>Which celebrations?</legend>
            <div className={styles.eventChecks}>
              {events.map((e) => (
                <label key={e.id} className={styles.eventCheck}>
                  <input type="checkbox" name="events" value={e.id} defaultChecked />
                  <span>
                    <strong>{e.name}</strong>
                    <small>
                      {e.when.weekday} {e.when.day} {e.when.month}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.rField}>
            <span>How many in your party?</span>
            <select value={partySize} onChange={(e) => setPartySize(Number(e.target.value))}>
              {Array.from({ length: maxPartySize }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? "Just me" : `${n} people`}
                </option>
              ))}
            </select>
          </label>

          {Array.from({ length: partySize - 1 }, (_, i) => (
            <label key={i} className={styles.rField}>
              <span>Guest {i + 2} name</span>
              <input name="guest" autoComplete="off" />
            </label>
          ))}

          {askDiet && (
            <label className={`${styles.rField} ${styles.rWide}`}>
              <span>Dietary needs or allergies</span>
              <input name="diet" placeholder="Vegetarian, vegan, Jain, nut allergy…" />
            </label>
          )}
          {askSong && (
            <label className={`${styles.rField} ${styles.rWide}`}>
              <span>A song that will get you on the dance floor</span>
              <input name="song" placeholder="Artist — song" />
            </label>
          )}
        </>
      )}

      <label className={`${styles.rField} ${styles.rWide}`}>
        <span>A note for the couple</span>
        <textarea name="message" rows={3} />
      </label>

      <label className={styles.honeypot} aria-hidden>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={`${styles.rWide} ${styles.rFoot}`}>
        <button type="submit" className={styles.rSubmit} disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send RSVP"}
        </button>
        {status.state === "error" && (
          <p className={styles.rError} role="alert">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
