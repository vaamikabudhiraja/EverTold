import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { getWedding } from "@/content/weddings";
import { offlineAnswer, systemPrompt } from "@/lib/concierge";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/concierge
 * Body: { slug, messages: [{ role: "user" | "assistant", content }] }
 * Streams the concierge's reply back as plain text.
 */

const MODEL = process.env.CONCIERGE_MODEL ?? "claude-opus-5-5";
const MAX_TURNS = 16;

const Body = z.object({
  slug: z.string().min(1).max(80),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1500),
      }),
    )
    .min(1)
    .max(40),
});

const hasCredentials = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const client = hasCredentials ? new Anthropic() : null;

function textResponse(text: string, mode: "live" | "offline", status = 200) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "x-concierge-mode": mode, "cache-control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!rateLimit(`concierge:${clientIp(request)}`, 20, 60_000)) {
    return textResponse(
      "You're asking faster than I can answer — give me a few seconds and try again.",
      "offline",
      429,
    );
  }

  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return textResponse("Sorry, I couldn't read that question.", "offline", 400);

  const wedding = getWedding(parsed.data.slug);
  if (!wedding) return textResponse("I couldn't find that wedding.", "offline", 404);

  // Keep the most recent turns, starting on a guest message.
  let history = parsed.data.messages.slice(-MAX_TURNS);
  while (history.length && history[0].role !== "user") history = history.slice(1);
  const lastQuestion = history.at(-1);
  if (!lastQuestion || lastQuestion.role !== "user") {
    return textResponse("Ask me anything about the wedding.", "offline", 400);
  }

  if (!client) return textResponse(offlineAnswer(wedding, lastQuestion.content), "offline");

  const today = new Intl.DateTimeFormat("en-GB", {
    timeZone: wedding.timezone,
    dateStyle: "full",
  }).format(new Date());

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentAny = false;
      try {
        const response = client.beta.messages.stream({
          model: MODEL,
          max_tokens: 8000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          system: [{ type: "text", text: systemPrompt(wedding), cache_control: { type: "ephemeral" } }],
          messages: [
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "system", content: `Today's date for the guest is ${today}.` },
          ],
        });

        response.on("text", (delta) => {
          sentAny = true;
          controller.enqueue(encoder.encode(delta));
        });

        const final = await response.finalMessage();
        if (final.stop_reason === "refusal" && !sentAny) {
          controller.enqueue(encoder.encode(offlineAnswer(wedding, lastQuestion.content)));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.warn("[concierge] rate limited by the API");
        } else if (error instanceof Anthropic.APIError) {
          console.error(`[concierge] API error ${error.status}: ${error.message}`);
        } else {
          console.error("[concierge] unexpected error", error);
        }
        // Fall back to the brief so the guest still gets an answer.
        if (!sentAny) controller.enqueue(encoder.encode(offlineAnswer(wedding, lastQuestion.content)));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "x-concierge-mode": "live", "cache-control": "no-store" },
  });
}
