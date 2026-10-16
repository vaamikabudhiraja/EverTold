/**
 * Everything EverTold says about itself. The page sections render from this
 * file and the concierge answers from it, so edit here and both stay in sync.
 */

export type Service = {
  title: string;
  body: string;
  /** Visual for the service card: a key of servicePhotos in media.ts, or a chat illustration. */
  media: "chat" | "storySite" | "rsvp" | "vault" | "schedule" | "gallery";
};

export const services: Service[] = [
  {
    title: "The Story Site",
    body: "An immersive, scroll-told website for your wedding — your story, your weekend, your city — designed around your palette, never a template.",
    media: "storySite",
  },
  {
    title: "RSVP & Guest List",
    body: "Per-event RSVPs with plus-ones, dietary notes and song requests, flowing into a live guest list you can export in one click.",
    media: "rsvp",
  },
  {
    title: "AI Concierge",
    body: "A concierge that has read every detail of your wedding. Guests ask what to wear or when the shuttle leaves at 2am; it answers instantly and accurately.",
    media: "chat",
  },
  {
    title: "The Wedding Vault",
    body: "Every detail in one place — events, venues, hotel blocks, travel, FAQs. Update it once and the site and concierge update with it.",
    media: "vault",
  },
  {
    title: "Schedule & Travel",
    body: "Multi-day itineraries with add-to-calendar, maps, shuttle times, room-block codes and weather — everything a travelling guest needs.",
    media: "schedule",
  },
  {
    title: "Gallery & Keepsake",
    body: "Before the day, your story. After it, a gallery your guests return to. Your site becomes the keepsake of the weekend.",
    media: "gallery",
  },
];

export type Package = { name: string; summary: string; items: string[]; featured?: boolean };

export const packages: Package[] = [
  {
    name: "The Save the Date",
    summary: "One beautiful page to announce the date and start the countdown.",
    items: [
      "Custom one-page design",
      "Date, place & live countdown",
      "Guest address & email collection",
      "Add-to-calendar for guests",
    ],
  },
  {
    name: "The Celebration",
    summary: "Your full wedding website with per-event RSVPs.",
    items: [
      "Everything in The Save the Date",
      "Story, schedule, travel & FAQs",
      "Per-event RSVPs & guest list export",
      "Maps, dress codes & hotel blocks",
    ],
  },
  {
    name: "The Full Story",
    summary: "The complete immersive experience, with your own AI concierge.",
    items: [
      "Everything in The Celebration",
      "Scroll-told, cinematic design",
      "AI concierge trained on your wedding",
      "Wedding Vault for every detail",
      "Post-wedding gallery & keepsake",
    ],
    featured: true,
  },
];

export const steps = [
  {
    title: "Discovery call",
    body: "We learn your story, your weekend and your guests. Bring the mood board — we'll bring the questions.",
  },
  {
    title: "Your story, gathered",
    body: "One simple questionnaire becomes your Wedding Vault: events, venues, travel, FAQs and photos. We do the chasing.",
  },
  {
    title: "Design & build",
    body: "A site that feels like your wedding — your palette, your type, your rhythm — with a concierge trained on every detail.",
  },
  {
    title: "Launch & guest care",
    body: "Share one link. RSVPs flow in, the concierge answers questions, and the site stays current right up to the last song.",
  },
];

export type Faq = {
  q: string;
  a: string;
  /** Words that help the offline concierge match a visitor's question to this answer. */
  keywords: string[];
};

export const faqs: Faq[] = [
  {
    q: "What exactly do we get?",
    a: "A wedding website designed just for you, at its own link: your story, the schedule for every event, travel and hotel details, FAQs for guests, RSVPs — and, if you'd like, an AI concierge that answers your guests' questions.",
    keywords: ["include", "included", "includes", "offer", "features", "make", "website"],
  },
  {
    q: "Do our guests need an app or an account?",
    a: "No. It's a website, so it opens on any phone or laptop from the link on your invitation.",
    keywords: ["app", "account", "download", "login", "sign up", "phone", "mobile"],
  },
  {
    q: "How does the AI concierge work?",
    a: "It reads only your wedding details — times, venues, dress codes, travel, FAQs — and answers guests any time of day. If it doesn't know something, it says so and points them to you or your planner. You can try it on this page.",
    keywords: ["concierge", "ai", "chatbot", "chat", "bot", "assistant", "questions"],
  },
  {
    q: "Can guests RSVP to some events and not others?",
    a: "Yes. Each event gets its own RSVP, with plus-ones, dietary needs and song requests.",
    keywords: ["rsvp", "events", "plus one", "plus-one", "dietary", "song"],
  },
  {
    q: "Where do the RSVPs go?",
    a: "To your private guest list, with live headcounts for every event, everyone's dietary notes and a one-click spreadsheet download.",
    keywords: ["guest list", "headcount", "spreadsheet", "export", "replies", "responses", "track"],
  },
  {
    q: "Can it match the look of our wedding?",
    a: "That's the point. Every site is designed around your colours, your photos and the feel of your celebration — nothing is a template.",
    keywords: ["design", "look", "style", "colours", "colors", "theme", "template", "custom", "match"],
  },
  {
    q: "How long does it take, and what does it cost?",
    a: "It depends on the package and how many events you're having. Tell us about your wedding using the form on this page and we'll come back with timings and pricing.",
    keywords: [
      "price",
      "pricing",
      "cost",
      "costs",
      "how much",
      "fee",
      "budget",
      "long",
      "timeline",
      "time",
      "weeks",
      "deadline",
    ],
  },
];
