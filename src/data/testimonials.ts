/**
 * GENUINE CUSTOMER REVIEWS ONLY.
 *
 * Add real reviews here (with the guest's permission). Never invent names,
 * ratings or quotes. While this list is empty, the Testimonials section on
 * the home page shows an invitation instead of reviews.
 *
 * This shape is ready to be served from a database / admin panel later:
 * replace the array with a fetch from your API.
 */
export type Testimonial = {
  name: string;
  /** e.g. "Mumbai" or "Family trip, May 2025" */
  context?: string;
  quote: string;
  /** Optional 1–5, only if the guest actually gave a rating. */
  rating?: number;
  /** Link to the original review (Google, Instagram…), if public. */
  sourceUrl?: string;
};

export const testimonials: Testimonial[] = [];
