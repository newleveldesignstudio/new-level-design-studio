export interface Testimonial {
  id: string;
  name: string;
  business: string;
  rating: number;
  text: string;
  photo?: string;
  googleReviewUrl?: string;
  date?: string;
  /** For future filtering (e.g. "Real Estate", "Local Business"). Not yet used by the UI. */
  category?: string;
}

/** Master switch — flip to true once real reviews are added and approved for display. */
export const testimonialsEnabled = true;

// Verified against the live NLDS Google Business Profile 2026-08-09. Exact review
// text and 5-star rating, unedited. The reviewer's Google-displayed name renders
// as a garbled two-person concatenation ("EileenandJoe IaconisandWynne, Realtor")
// — a GBP data artifact, not the account holder's intended display name. "Eileen
// Wynne" / "Worth Clark Realty" are her verified real name and brokerage (confirmed
// in the live Wynne-Iaconis Realty site build this studio produced for her). No
// reviewer photo is used — the only available image is her live Google avatar,
// which isn't ours to rehost.
export const testimonials: Testimonial[] = [
  {
    id: 'eileen-wynne-worth-clark-realty',
    name: 'Eileen Wynne',
    business: 'Realtor, Worth Clark Realty',
    rating: 5,
    text: 'Michael did a great job designing our website! He was professional, creative, prompt, and very easy to work with. We are very happy with the finished product and would highly recommend him for website design.',
    googleReviewUrl: 'https://maps.app.goo.gl/zJoh96H7j5DB3kNp6?g_st=ic',
  },
];

/*
  Example structure — copy this shape when adding a real testimonial.
  Use only real, client-approved wording. Never paraphrase or invent text, ratings, or dates.

  {
    id: 'client-slug',
    name: 'Client Name',
    business: 'Business Name',
    rating: 5,
    text: 'Exact approved review text.',
    photo: '/nlds/images/client-photo.webp', // optional
    googleReviewUrl: 'https://g.page/r/.../review', // optional
    date: '2026-08-05', // optional
    category: 'Real Estate', // optional
  },
*/
