export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Site-wide media. Swap a file in /public and its entry here, and every
 * section that uses it updates.
 */

export type FilmFrame = {
  src: string;
  /** object-position inside the 600 × 750 frame. */
  position: string;
  /** A wider frame for a landscape picture. */
  wide?: boolean;
  /** Pushes the picture in slightly, to crop away its edges. */
  zoom?: number;
};

/**
 * The opening film strip, in the order the frames pull through the gate.
 * It's drawn live in the page (not a video), so it plays on every phone.
 */
export const filmStrip: FilmFrame[] = [
  { src: "/film/01.webp", position: "50% 50%" },
  { src: "/film/02.webp", position: "50% 60%" },
  { src: "/film/03.webp", position: "50% 60%" },
  { src: "/film/04.webp", position: "50% 60%" },
  { src: "/film/05.webp", position: "50% 50%" },
  { src: "/film/06.webp", position: "50% 50%" },
  { src: "/film/07.webp", position: "50% 50%" },
  { src: "/film/08.webp", position: "50% 0%" },
  { src: "/film/09.webp", position: "0% 50%" },
  { src: "/film/10.webp", position: "50% 50%", wide: true, zoom: 1.07 },
];

/** Photos used across the page: the about section, the photo scatter and the colour panels. */
export const photos = {
  garden: {
    src: "/photos/garden.webp",
    alt: "Bride in a beaded veil and groom in a cream suit celebrating on a lawn at dusk, both in red-tinted sunglasses",
    width: 2000,
    height: 2000,
  },
  dance: {
    src: "/photos/dance.webp",
    alt: "Sepia photo of a bride throwing one arm up as she dances with the groom",
    width: 2000,
    height: 2000,
  },
  thankYou: {
    src: "/photos/thank-you.webp",
    alt: "Bride and groom sitting in front of a green wall beneath a Thank you sign",
    width: 2000,
    height: 2000,
  },
  diner: {
    src: "/photos/diner.webp",
    alt: "Bride and groom in sunglasses sipping from cans in a diner booth",
    width: 2000,
    height: 2000,
  },
  bar: {
    src: "/photos/bar.webp",
    alt: "Groom and bride drinking from cups at a busy bar at night",
    width: 2000,
    height: 2000,
  },
  elevator: {
    src: "/film/01.webp",
    alt: "Bride and groom kissing in a brass-framed hotel lift",
    width: 735,
    height: 916,
  },
  curb: {
    src: "/film/03.webp",
    alt: "Bride and groom in sunglasses eating pizza on a kerb at night",
    width: 736,
    height: 920,
  },
} satisfies Record<string, Photo>;

/**
 * One picture per "What we make" card. These are stand-ins; replace the files
 * (same names) when the real pictures arrive.
 */
export const servicePhotos = {
  storySite: {
    src: "/photos/services/story-site.jpg",
    alt: "A couple sharing noodles at a restaurant table",
    width: 1200,
    height: 1197,
  },
  rsvp: {
    src: "/photos/services/rsvp.jpg",
    alt: "A groom in sunglasses lifting noodles with chopsticks",
    width: 900,
    height: 1201,
  },
  vault: {
    src: "/photos/services/vault.jpg",
    alt: "A bride in sunglasses and a veil at dinner",
    width: 900,
    height: 1201,
  },
  schedule: {
    src: "/photos/services/schedule.webp",
    alt: "A bride and groom in sunglasses walking hand in hand past a restaurant",
    width: 736,
    height: 920,
  },
  gallery: {
    src: "/photos/services/gallery.jpg",
    alt: "Black and white view of a restaurant bar",
    width: 880,
    height: 1200,
  },
} satisfies Record<string, Photo>;
