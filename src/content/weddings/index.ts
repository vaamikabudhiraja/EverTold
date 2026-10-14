import { anayaAndKabir } from "./anaya-and-kabir";
import type { Wedding } from "./types";

/** Register each couple's site here. The slug becomes the URL: /w/<slug>. */
const weddings: Wedding[] = [anayaAndKabir];

export const DEMO_SLUG = anayaAndKabir.slug;

export function getWedding(slug: string): Wedding | undefined {
  return weddings.find((w) => w.slug === slug);
}

export function allWeddingSlugs(): string[] {
  return weddings.map((w) => w.slug);
}
