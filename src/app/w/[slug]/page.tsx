import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { WeddingSite } from "@/components/wedding/WeddingSite";
import { allWeddingSlugs, getWedding } from "@/content/weddings";

export function generateStaticParams() {
  return allWeddingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/w/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  const names = `${w.couple.first} & ${w.couple.second}`;
  return {
    title: { absolute: `${names} — ${w.dateLabel}` },
    description: w.tagline,
    openGraph: { title: names, description: `${w.dateLabel} · ${w.location.city}, ${w.location.region}` },
  };
}

async function Wedding({ params }: { params: PageProps<"/w/[slug]">["params"] }) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) notFound();
  return <WeddingSite wedding={wedding} />;
}

export default function WeddingPage({ params }: PageProps<"/w/[slug]">) {
  // Params are read inside Suspense so unlisted slugs can stream behind an instant shell.
  return (
    <Suspense fallback={<div style={{ minHeight: "100svh", background: "var(--ink)" }} aria-busy="true" />}>
      <Wedding params={params} />
    </Suspense>
  );
}
