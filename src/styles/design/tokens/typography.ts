/**
 * Typography tokens
 * Centralized text styles used across the entire app.
 */

export const typography = {
  heading: {
    xl: 'text-5xl md:text-6xl font-bold',
    lg: 'text-4xl md:text-5xl font-bold',
    md: 'text-3xl md:text-4xl font-bold',
    sm: 'text-2xl md:text-3xl font-bold',
    xs: 'text-xl md:text-2xl font-bold',
  },

  subheading: {
    xl: 'text-3xl md:text-4xl font-medium',
    lg: 'text-2xl md:text-3xl font-medium',
    md: 'text-xl md:text-2xl font-medium',
    sm: 'text-lg md:text-xl font-medium',
    xs: 'text-base md:text-lg font-medium',
  },

  muted: {
    md: 'text-stone-500 dark:text-stone-400',
  },
} as const;