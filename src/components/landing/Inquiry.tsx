"use client";

import { useState } from "react";

import styles from "./landing.module.css";

const features = ["Story site", "RSVP & guest list", "AI concierge", "Wedding vault", "Travel & stays", "Gallery"];
const guestRanges = ["Under 50", "50–100", "100–200", "200–400", "400+"];

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

export function Inquiry() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          names: data.get("names"),
          email: data.get("email"),
          date: data.get("date"),
          location: data.get("location"),
          guests: data.get("guests"),
          features: data.getAll("features"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error);
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error && err.message ? err.message : "Something went wrong — please try again.",
      });
    }
  }

  return (
    <section className={styles.inquiry} id="inquire" aria-labelledby="inquire-title">
      <div className={styles.inquiryHead}>
        <p className="eyebrow">(08) — Get in touch</p>
        <h2 id="inquire-title" className={`display ${styles.inquiryTitle}`}>
          Let&apos;s make
          <br />
          yours.
        </h2>
        <p>Tell us about your wedding and we&apos;ll come back with ideas, timings and pricing.</p>
      </div>

      {status.state === "sent" ? (
        <div className={styles.sent} role="status">
          <p className="display">Thank you.</p>
          <p>Your story is in good hands. We&apos;ll be in touch very soon.</p>
          <button type="button" className={styles.textLink} onClick={() => setStatus({ state: "idle" })}>
            Send another
          </button>
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            submit(e.currentTarget);
          }}
        >
          <label className={styles.field}>
            <span>Your names</span>
            <input name="names" required minLength={2} placeholder="Maya & Jordan" autoComplete="name" />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
          </label>
          <label className={styles.field}>
            <span>Wedding date</span>
            <input name="date" placeholder="Feb 2027, or still deciding" />
          </label>
          <label className={styles.field}>
            <span>Location</span>
            <input name="location" placeholder="Goa, Tuscany, your backyard…" />
          </label>
          <label className={styles.field}>
            <span>Guests</span>
            <select name="guests" defaultValue="">
              <option value="" disabled>
                Roughly how many?
              </option>
              {guestRanges.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <fieldset className={`${styles.field} ${styles.fieldWide}`}>
            <legend>What would you like?</legend>
            <div className={styles.checks}>
              {features.map((f) => (
                <label key={f} className={styles.check}>
                  <input type="checkbox" name="features" value={f} />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span>Tell us about your wedding</span>
            <textarea
              name="message"
              rows={4}
              placeholder="The vibe, the events, the people, the thing you'd love guests to feel…"
            />
          </label>
          <label className={styles.honeypot} aria-hidden>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <div className={`${styles.fieldWide} ${styles.formFoot}`}>
            <button type="submit" className={styles.pillDark} disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Send inquiry"}
            </button>
            {status.state === "error" && (
              <p className={styles.formError} role="alert">
                {status.message}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
