import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny JSON-file store for inquiries from the contact form.
 *
 * Fine for a single server or local development. On serverless hosts the
 * filesystem is ephemeral, so point EVERTOLD_DATA_DIR at a mounted volume or
 * swap these functions for a real database before going live.
 */

const dataDir = process.env.EVERTOLD_DATA_DIR ?? path.join(process.cwd(), ".data");

// Serialise writes per collection so concurrent requests don't clobber each other.
const queues = new Map<string, Promise<unknown>>();

function fileFor(collection: string) {
  return path.join(dataDir, `${collection}.json`);
}

export async function readAll<T>(collection: string): Promise<T[]> {
  try {
    const raw = await readFile(fileFor(collection), "utf8");
    return JSON.parse(raw) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export function mutate<T>(collection: string, fn: (rows: T[]) => T[]): Promise<T[]> {
  const previous = queues.get(collection) ?? Promise.resolve();
  const next = previous.then(async () => {
    const rows = fn(await readAll<T>(collection));
    await mkdir(dataDir, { recursive: true });
    const target = fileFor(collection);
    const tmp = `${target}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(rows, null, 2));
    await rename(tmp, target);
    return rows;
  });
  // Keep the chain alive even if this write fails.
  queues.set(
    collection,
    next.catch(() => undefined),
  );
  return next;
}
