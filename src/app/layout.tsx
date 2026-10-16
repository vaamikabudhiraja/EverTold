import type { Metadata, Viewport } from "next";
import { Anton, Archivo_Narrow, IBM_Plex_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";

import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

// The opening film's title card and edge printing.
const filmTitle = Archivo_Narrow({
  variable: "--font-film",
  weight: "700",
  subsets: ["latin"],
});

const filmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Wedding websites your guests step into`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Wedding websites your guests step into`,
    description: site.description,
    images: ["/media/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${filmTitle.variable} ${filmMono.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
