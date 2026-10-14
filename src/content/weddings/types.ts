/**
 * Everything a couple's site knows lives in one Wedding object. The site,
 * the RSVP form and the AI concierge all read from it, so it is the single
 * source of truth for a wedding.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WeddingEvent = {
  id: string;
  name: string;
  /** ISO 8601 with offset, e.g. 2027-02-12T17:30:00+05:30 */
  start: string;
  end: string;
  venue: string;
  address: string;
  mapUrl?: string;
  dressCode: string;
  palette?: string[];
  description: string;
  /** Guests can RSVP to this event individually. */
  rsvp: boolean;
};

export type StoryChapter = {
  year: string;
  title: string;
  body: string;
  photo?: Photo;
};

export type Stay = {
  name: string;
  kind: string;
  distance: string;
  note: string;
  url?: string;
};

export type Faq = {
  q: string;
  a: string;
  /** Extra words that help the offline concierge match guest questions. */
  keywords?: string[];
};

export type Wedding = {
  slug: string;
  couple: { first: string; second: string; hashtag?: string };
  tagline: string;
  date: string;
  dateLabel: string;
  location: { city: string; region: string; country: string };
  timezone: string;
  rsvpDeadline: string;
  hero: { video?: { mp4: string; webm?: string; poster: string }; photo?: Photo };
  welcome: string;
  story: StoryChapter[];
  events: WeddingEvent[];
  travel: {
    airport: string;
    gettingThere: string;
    gettingAround: string;
    weather: string;
    stays: Stay[];
  };
  dressGuide: string;
  gifts: string;
  faqs: Faq[];
  gallery: Photo[];
  contacts: { name: string; role: string; email?: string; phone?: string }[];
  rsvpOptions: { maxPartySize: number; askSong: boolean; askDiet: boolean };
  theme: { accent: string; accentInk: string; paper: string };
};
