export * from "../../consts";
import type { Feature } from '../types';

/**
 * Static feature definitions for the FeaturesSection component.
 * Each feature has four copy variants (word, action, plea, name) so the
 * same section can appear multiple times on the site with a different tone
 * without duplicating data. Pass the desired variant key to FeaturesSection.
 *
 * Shared fields (description, link) don't change between variants.
 *
 * @example
 * // Motivational tone near the hero
 * <FeaturesSection variant="plea" features={features} />
 *
 * // Understated tone further down the page
 * <FeaturesSection variant="word" features={features} />
 */
export const features: Feature[] = [
  {
    word:   { title: "Focus",            phrase: "Stop starting over" },
    action: { title: "Set a Routine",    phrase: "Discipline is just a habit you haven't built yet" },
    plea:   { title: "Stay on Task",     phrase: "Because willpower alone doesn't work" },
    name:   { title: "Habit Tracker",    phrase: "The quiet work that compounds" },
    description: "Build lasting habits with a tracker that stays out of your way. Log your streaks, spot your patterns, and keep showing up.",
    link: "/habits"
  },
  {
    word:   { title: "Journal",          phrase: "The page doesn't judge" },
    action: { title: "Start Writing",    phrase: "Some things need to be said out loud" },
    plea:   { title: "Clear Your Head",  phrase: "Because some things need to be said out loud" },
    name:   { title: "Journal App",      phrase: "The quiet work that compounds" },
    description: "A private space to think out loud. Write freely, reflect often, and make sense of the noise.",
    link: "/journal"
  },
  {
    word:   { title: "Breathe",          phrase: "Just this moment" },
    action: { title: "Find Your Calm",   phrase: "Two minutes is enough to start" },
    plea:   { title: "Slow Down",        phrase: "Because your brain needs a break too" },
    name:   { title: "Meditation Guide", phrase: "Structure without the pressure" },
    description: "Guided sessions that fit into a real day. Start small, go at your own pace, and actually finish.",
    link: "/meditate"
  },
] as const;

