import { getWedding } from "@/content/weddings";
import { checkAccess, guestList, toCsv } from "@/lib/admin";

/** GET /api/rsvp/export?slug=…&key=… — the guest list as a CSV download. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const wedding = getWedding(url.searchParams.get("slug") ?? "");
  if (!wedding) return new Response("Unknown wedding", { status: 404 });

  const access = checkAccess(url.searchParams.get("key"));
  if (access !== "ok") return new Response("Not authorised", { status: access === "disabled" ? 404 : 401 });

  const { rows } = await guestList(wedding);
  return new Response(toCsv(wedding, rows), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${wedding.slug}-guest-list.csv"`,
      "cache-control": "no-store",
    },
  });
}
