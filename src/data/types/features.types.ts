// src/data/features.types.ts

/** A title and phrase pairing for a single copy variant. */
export interface FeatureVariant {
  /** The title displayed on the card */
  title: string;
  /** A subheading or slogan that pairs with the title */
  phrase: string;
}

/**
 * A single feature with four copy variants for use across different
 * FeaturesSection instances. Description and link are shared across
 * all variants since they describe the feature itself, not the tone.
 */
export interface Feature {
  /** Short punchy single word, good for tight layouts */
  word: FeatureVariant;
  /** Action-oriented, good for CTA-adjacent sections */
  action: FeatureVariant;
  /** Emotional/motivational, good for hero-adjacent sections */
  plea: FeatureVariant;
  /** Default descriptive name */
  name: FeatureVariant;
  /** Shared across all variants */
  description: string;
  link: string;
}