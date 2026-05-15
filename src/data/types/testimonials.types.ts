/** A single testimonial entry. */
export interface Testimonial {
  /** The person's display name */
  name: string;
  /** Their job title or role */
  title: string;
  /** The testimonial quote — no quotation marks, the component adds those */
  quote: string;
}
