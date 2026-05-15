/** A single pricing tier. */
export interface PricingPlan {
  /** Display name of the plan */
  title: string;
  /** Price string, e.g. "Free" or "$12" */
  price: string;
  /** Billing period, e.g. "/mo" — omit for free plans */
  period?: string;
  /** List of feature strings displayed as bullet points */
  features: string[];
  /** Whether to visually highlight this as the recommended plan */
  highlighted?: boolean;
  /** CTA button label */
  ctaText: string;
}
