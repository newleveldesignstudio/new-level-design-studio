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
export const testimonialsEnabled = false;

export const testimonials: Testimonial[] = [];

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
