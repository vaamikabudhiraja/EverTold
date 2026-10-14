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
  mp4: "/media/hero-beach.mp4",
  webm: "/media/hero-beach.webm",
  poster: "/media/hero-beach-poster.jpg",
};

export const photos = {
  piggyback: {
    src: "/photos/piggyback.jpg",
    alt: "Groom carrying the bride over his shoulder on a city street at night",
    width: 880,
    height: 1200,
  },
  noodles: {
    src: "/photos/noodles.jpg",
    alt: "Couple in sunglasses twirling noodles at a red-clothed table",
    width: 900,
    height: 1200,
  },
  kiss: {
    src: "/photos/kiss.jpg",
    alt: "Couple kissing as their wedding party rushes past in a blur",
    width: 900,
    height: 1200,
  },
  spaghetti: {
    src: "/photos/spaghetti.jpg",
    alt: "Bride and groom sharing spaghetti at a neighbourhood bar",
    width: 1440,
    height: 840,
  },
  doorstep: {
    src: "/photos/doorstep.jpg",
    alt: "Newlyweds sitting on a doorstep beneath the words I'm thankful for today",
    width: 900,
    height: 1200,
  },
} satisfies Record<string, Photo>;

export const photoList: Photo[] = Object.values(photos);
