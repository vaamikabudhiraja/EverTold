import { z } from "zod";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import { mutate } from "@/lib/store";

/** POST /api/inquiry — a couple asking EverTold to build their site. */

/** Optional free text: missing, null or blank all become "". */
const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => v ?? "");

const Body = z.object({
  names: z.string().trim().min(2).max(160),
  email: z.email().max(200),
  date: text(40),
  location: text(160),
  guests: text(20),
  features: z.array(z.string().max(40)).max(12).default([]),
  message: text(3000),
  website: z.string().max(0).nullish(),
});

export async function POST(request: Request) {
  if (!rateLimit(`inquiry:${clientIp(request)}`, 5, 60_000)) {
    return Response.json({ ok: false, error: "Too many attempts — please wait a minute." }, { status: 429 });
  }
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please add your names and a valid email." }, { status: 400 });
  }
  const { website: _honeypot, ...inquiry } = parsed.data;
  void _honeypot;

  await mutate("inquiries", (rows) => [
    ...rows,
    { id: crypto.randomUUID(), ...inquiry, createdAt: new Date().toISOString() },
  ]);

  return Response.json({ ok: true });
}
