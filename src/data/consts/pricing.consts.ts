import type { PricingPlan } from '../types/pricing.types';

/**
 * Static pricing plan definitions for PricingSection.
 *
 * @example
 * <PricingSection plans={plans} />
 */
export const plans: PricingPlan[] = [
  {
    title: "Starter",
    price: "Free",
    features: [
      "Basic habit tracking",
      "Daily journal entries",
      "5 meditation sessions",
      "Community access",
    ],
    ctaText: "Get started",
  },
  {
    title: "Professional",
    price: "$12",
    period: "/mo",
    features: [
      "Unlimited habit tracking",
      "Unlimited journal entries",
      "All meditation sessions",
      "Advanced analytics",
      "Priority support",
    ],
    highlighted: true,
    ctaText: "Get started",
  },
  {
    title: "Premium",
    price: "$24",
    period: "/mo",
    features: [
      "Everything in Professional",
      "1-on-1 coaching session",
      "Custom habit plans",
      "API access",
      "White-label options",
    ],
    ctaText: "Get started",
  },
] as const;
