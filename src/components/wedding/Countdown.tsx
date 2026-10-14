"use client";

import { useEffect, useState } from "react";

import styles from "./wedding.module.css";

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86_400_000),
    Hours: Math.floor(ms / 3_600_000) % 24,
    Minutes: Math.floor(ms / 60_000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ target }: { target: string }) {
  const [parts, setParts] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const t = new Date(target).getTime();
    const update = () => setParts(remaining(t));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

  return (
    <div className={styles.countdown} role="timer" aria-label="Countdown to the ceremony">
      {units.map((u) => (
        <div key={u} className={styles.countUnit}>
          <span className={styles.countValue}>{parts ? String(parts[u]).padStart(2, "0") : "––"}</span>
          <span className="eyebrow">{u}</span>
        </div>
      ))}
    </div>
  );
}
