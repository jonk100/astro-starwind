import type { Testimonial } from '../types/testimonials.types';

/**
 * Static testimonial definitions for TestimonialsSection.
 *
 * @example
 * <TestimonialsSection testimonials={testimonials} />
 */
export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    title: "Product Manager",
    quote: "I finally understand what's driving my behavior. The journal app helped me see patterns I'd been missing for years.",
  },
  {
    name: "John D.",
    title: "Software Engineer",
    quote: "The habit tracker made me see what I was actually doing, not what I thought I was doing.",
  },
  {
    name: "Emily R.",
    title: "Marketing Specialist",
    quote: "Writing in the journal became the thing I looked forward to each night. It settled me.",
  },
] as const;
