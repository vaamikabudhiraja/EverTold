"use client";

import { useEffect, useId, useRef, useState } from "react";

import styles from "./chat.module.css";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! I'm EverTold's concierge — the same kind we build into couples' wedding websites. Ask me anything about what we make, our packages or how it works.";

export function ConciergeChat({ suggestions }: { suggestions: string[] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setDraft("");
    setBusy(true);

    const appendToReply = (chunk: string) =>
      setMessages((current) => {
        const next = current.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + chunk };
        return next;
      });

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        appendToReply(decoder.decode(value, { stream: true }));
      }
    } catch {
      appendToReply("I lost my connection for a moment — please ask again.");
    } finally {
      setBusy(false);
    }
  }

  const showSuggestions = messages.length === 0;

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <span className={styles.dot} aria-hidden />
        <div>
          <p className={styles.title}>EverTold concierge</p>
          <p className={styles.sub}>Answers from everything on this site</p>
        </div>
      </div>

      <div className={styles.log} ref={logRef} aria-live="polite" data-lenis-prevent>
        <p className={`${styles.bubble} ${styles.assistant}`}>{GREETING}</p>
        {messages.map((m, i) => (
          <p key={i} className={`${styles.bubble} ${m.role === "user" ? styles.user : styles.assistant}`}>
            {m.content || <span className={styles.typing} aria-label="Concierge is typing" />}
          </p>
        ))}
        {showSuggestions && (
          <div className={styles.suggestions}>
            {suggestions.map((s) => (
              <button key={s} type="button" className={styles.suggestion} onClick={() => ask(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <label htmlFor={inputId} className="visually-hidden">
          Ask the concierge a question
        </label>
        <input
          id={inputId}
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about packages, the process, the concierge…"
          maxLength={500}
          autoComplete="off"
        />
        <button className={styles.send} type="submit" disabled={busy || !draft.trim()} aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
