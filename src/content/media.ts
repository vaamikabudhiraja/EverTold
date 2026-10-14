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

export const heroFilm = {
  mp4: "/media/hero-film.mp4",
  webm: "/media/hero-film.webm",
  poster: "/media/hero-film-poster.jpg",
};

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
} satisfies Record<string, Photo>;

/**
 * One picture per "What we make" card. These are stand-ins cut from the hero
 * film; replace the files (same names) when the real pictures arrive.
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
  gallery: {
    src: "/photos/services/gallery.jpg",
    alt: "Black and white view of a restaurant bar",
    width: 880,
    height: 1200,
  },
} satisfies Record<string, Photo>;
