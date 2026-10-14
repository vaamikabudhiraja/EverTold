/** Shape of a stored RSVP. One per guest email per wedding; re-submitting updates it. */
export type RsvpRecord = {
  id: string;
  slug: string;
  name: string;
  email: string;
  attending: boolean;
  events: string[];
  partySize: number;
  guests: string[];
  diet: string;
  song: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};
