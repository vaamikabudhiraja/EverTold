import { heroFilm, photos } from "../media";
import type { Wedding } from "./types";

/**
 * Demo wedding. A fictional couple used to show prospective clients what an
 * EverTold site does. Copy this file to start a new couple's site.
 */
export const anayaAndKabir: Wedding = {
  slug: "anaya-and-kabir",
  sample: true,
  couple: { first: "Anaya", second: "Kabir", hashtag: "#AnayaAndKabir" },
  tagline: "Three days, one beach, everyone we love.",
  date: "2027-02-14",
  dateLabel: "12 — 14 February 2027",
  location: { city: "Morjim", region: "North Goa", country: "India" },
  timezone: "Asia/Kolkata",
  rsvpDeadline: "2026-12-15",
  hero: { video: heroFilm },
  welcome:
    "We met over the wrong plate of noodles, fell in love across two time zones, and now we want everyone who carried us here on one beach for one long weekend. This site has everything you need — and if it doesn't, ask our concierge. It knows more about this wedding than we do.",
  story: [
    {
      year: "2019",
      title: "The wrong order",
      body: "A crowded noodle bar in Bandra. Kabir's order landed on Anaya's table. She ate half of it before he came to claim it. He stayed for the other half.",
      photo: photos.noodles,
    },
    {
      year: "2021",
      title: "Two time zones",
      body: "London for him, Mumbai for her. Four hundred and twelve video calls, one shared playlist, and a running list of restaurants to try when the distance ended.",
      photo: photos.spaghetti,
    },
    {
      year: "2025",
      title: "The question",
      body: "Morjim, golden hour, a ring hidden in a takeaway box. She said yes before he finished the sentence. The noodles went cold.",
      photo: photos.doorstep,
    },
    {
      year: "2027",
      title: "Forever, in Goa",
      body: "Back to the same beach, this time with all of you. Bring sunscreen, bring dancing shoes, bring your loudest cheer.",
      photo: photos.kiss,
    },
  ],
  events: [
    {
      id: "sundowner",
      name: "Welcome Sundowner",
      start: "2027-02-12T17:30:00+05:30",
      end: "2027-02-12T21:00:00+05:30",
      venue: "Villa Mareia — Sea Lawn",
      address: "Villa Mareia, Morjim Beach Road, North Goa",
      mapUrl: "https://maps.google.com/?q=Morjim+Beach+Goa",
      dressCode: "Beach easy — linen, cotton, sandals.",
      palette: ["#efe6d6", "#ffffff", "#9cc4d6"],
      description:
        "Drinks and small plates on the lawn as the sun drops into the sea. Come straight from the airport if you need to — nobody will judge the creases.",
      rsvp: true,
    },
    {
      id: "mehendi",
      name: "Mehendi Brunch",
      start: "2027-02-13T11:00:00+05:30",
      end: "2027-02-13T15:00:00+05:30",
      venue: "The Palm House — Garden",
      address: "The Palm House, Ashvem Road, North Goa",
      mapUrl: "https://maps.google.com/?q=Ashvem+Beach+Goa",
      dressCode: "Bright and breezy — florals, block colour, anything that loves the sun.",
      palette: ["#f2b33d", "#e8714f", "#6f9a5a"],
      description:
        "A long brunch in the garden while the mehendi artists work their way through the bride's hands — and anyone else who wants a design. Family-friendly.",
      rsvp: true,
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      start: "2027-02-13T19:30:00+05:30",
      end: "2027-02-14T01:00:00+05:30",
      venue: "The Palm House — Courtyard",
      address: "The Palm House, Ashvem Road, North Goa",
      mapUrl: "https://maps.google.com/?q=Ashvem+Beach+Goa",
      dressCode: "Indo-glam — sequins, jewel tones, shoes you can dance in.",
      palette: ["#2f7c7d", "#7a3b69", "#e2a857"],
      description:
        "Both families have been rehearsing for months and it shows (sometimes). Performances, a live band, then the dance floor is yours. Adults only.",
      rsvp: true,
    },
    {
      id: "wedding",
      name: "The Wedding",
      start: "2027-02-14T16:30:00+05:30",
      end: "2027-02-14T18:30:00+05:30",
      venue: "Morjim Beach — Lantern Aisle",
      address: "Morjim Beach, below Villa Mareia, North Goa",
      mapUrl: "https://maps.google.com/?q=Morjim+Beach+Goa",
      dressCode: "Festive formal in sunset tones. The aisle is sand — flats or block heels.",
      palette: ["#e8714f", "#f2c38f", "#8f86c4"],
      description:
        "The ceremony begins at golden hour on the beach, under the floral arch. Please be seated by 4:15 pm. This part is unplugged — phones away, hearts open.",
      rsvp: true,
    },
    {
      id: "reception",
      name: "Reception",
      start: "2027-02-14T19:30:00+05:30",
      end: "2027-02-15T01:00:00+05:30",
      venue: "Villa Mareia — Terrace",
      address: "Villa Mareia, Morjim Beach Road, North Goa",
      mapUrl: "https://maps.google.com/?q=Morjim+Beach+Goa",
      dressCode: "Evening glam — black tie optional.",
      palette: ["#0e0c10", "#e2a857", "#f4ede3"],
      description:
        "Dinner under string lights, a few (short, we promise) speeches, and dancing until the music stops. Adults only.",
      rsvp: true,
    },
  ],
  travel: {
    airport:
      "Fly into Manohar International Airport (GOX) in Mopa, North Goa — about 40 minutes by car from Morjim. Dabolim (GOI) also works but is around 90 minutes away.",
    gettingThere:
      "We've arranged airport pick-ups on 11 and 12 February for everyone staying at Casa Mareia or Saltwater Inn — add your flight details when you RSVP. Otherwise, prepaid taxis wait outside arrivals.",
    gettingAround:
      "Shuttles loop between the two hotels and every venue, leaving 30 minutes before each event and returning every 45 minutes until the end of the night. Scooter rentals are everywhere, but please don't ride after the Sangeet.",
    weather:
      "February is dry and sunny: around 32°C in the afternoon and 21°C at night. Pack sunscreen, sunglasses and a light layer for the evenings.",
    stays: [
      {
        name: "Casa Mareia",
        kind: "Boutique hotel — our room block",
        distance: "2 minutes' walk to the Villa and the beach",
        note: "Use code ANAYAKABIR27 for the wedding rate until 1 December 2026.",
      },
      {
        name: "Saltwater Inn",
        kind: "Beach cottages",
        distance: "10 minutes by shuttle",
        note: "Relaxed, barefoot, great breakfast. Wedding rate on request — mention our names.",
      },
      {
        name: "Alfama Guesthouse",
        kind: "Budget-friendly rooms",
        distance: "15 minutes by shuttle",
        note: "Simple, clean and walking distance to Ashvem beach.",
      },
    ],
  },
  dressGuide:
    "Every event has its own palette, listed in the schedule. You never have to match — think of the colours as a mood, not a rule. Wedding afternoon is on the sand, so leave the stilettos at home.",
  gifts:
    "Having you there is the gift, truly. If you'd still like to give something, we've set up a honeymoon fund for our trip to Japan — the link is in the RSVP confirmation email. Please don't bring boxed gifts to Goa; your suitcase will thank you.",
  faqs: [
    {
      q: "When is the RSVP deadline?",
      a: "Please RSVP by 15 December 2026 so we can confirm numbers with the venues. You can update your answers any time before then.",
      keywords: ["rsvp", "deadline", "reply", "respond", "by when"],
    },
    {
      q: "Can I bring a plus-one?",
      a: "Your invitation lists everyone included. If it says “and guest”, we'd love to meet them. If you're unsure, ask Meera, our planner.",
      keywords: ["plus one", "plus-one", "partner", "date", "bring someone", "guest"],
    },
    {
      q: "Are children invited?",
      a: "Little ones are very welcome at the Welcome Sundowner and the Mehendi Brunch. The Sangeet, Wedding and Reception are adults only. Meera can recommend trusted sitters in Morjim.",
      keywords: ["kids", "children", "child", "baby", "babysitter", "family"],
    },
    {
      q: "What shoes should I wear for the beach ceremony?",
      a: "The aisle is on sand, so go for flats, wedges or block heels. There will be a barefoot basket at the start of the aisle if you'd rather go shoeless.",
      keywords: ["shoes", "heels", "sand", "barefoot", "footwear"],
    },
    {
      q: "Is the ceremony unplugged?",
      a: "Yes, please keep phones away during the ceremony itself. Our photographers will share everything afterwards. At every other event, snap away and tag #AnayaAndKabir.",
      keywords: ["phone", "photos", "camera", "pictures", "unplugged", "hashtag", "instagram"],
    },
    {
      q: "What food will there be? I have dietary needs.",
      a: "Every event has vegetarian, vegan and Jain options, and the kitchen can handle allergies. Tell us your needs in the RSVP form and we'll pass them on.",
      keywords: ["food", "diet", "dietary", "vegan", "vegetarian", "jain", "allergy", "allergies", "gluten", "menu"],
    },
    {
      q: "Will there be alcohol?",
      a: "There's an open bar at the Sundowner, the Sangeet and the Reception, plus a full mocktail menu at every event.",
      keywords: ["alcohol", "bar", "drinks", "cocktails", "mocktails"],
    },
    {
      q: "How do the shuttles work?",
      a: "Shuttles leave Casa Mareia and Saltwater Inn 30 minutes before every event and come back every 45 minutes until the end of the night.",
      keywords: ["shuttle", "bus", "transport", "ride", "pick up", "pickup", "taxi", "parking", "car"],
    },
    {
      q: "Do I need a visa?",
      a: "Most international guests need an Indian visa, and many nationalities can apply for an e-Visa online. Apply at least four weeks before you fly, through the official government portal only.",
      keywords: ["visa", "passport", "e-visa", "evisa", "international"],
    },
    {
      q: "What about money?",
      a: "Goa uses Indian rupees. Cards work almost everywhere and there are ATMs in Morjim, but carry some cash for beach shacks and tips.",
      keywords: ["money", "cash", "currency", "rupees", "atm", "card", "tip"],
    },
    {
      q: "Can I get mehendi done too?",
      a: "Absolutely. The artists will be at the Mehendi Brunch from 11:30 and everyone is welcome to get a design — just join the queue by the swing.",
      keywords: ["henna", "mehndi", "mehendi", "design"],
    },
  ],
  gallery: [photos.kiss, photos.noodles, photos.spaghetti, photos.piggyback, photos.doorstep],
  contacts: [
    { name: "Meera Fernandes", role: "Wedding planner", email: "meera@example.com", phone: "+91 90000 00000" },
    { name: "Anaya & Kabir", role: "The couple", email: "hello@example.com" },
  ],
  rsvpOptions: { maxPartySize: 4, askSong: true, askDiet: true },
  theme: { accent: "#e8714f", accentInk: "#1a0f0b", paper: "#f4ede3" },
};
